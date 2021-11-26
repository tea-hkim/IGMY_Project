import os
from django.core.mail import message
import requests
from django.core.checks.messages import Info
from django.db.models.expressions import RawSQL
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import ImageForm, UserCreateSerializer, UserLoginSerializer, InfoPillSerializer
from .models import User, InfoPill, UserPill
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.shortcuts import redirect, reverse, get_object_or_404
from json.decoder import JSONDecodeError
from django.http import JsonResponse
from allauth.socialaccount.models import SocialAccount
from django.conf import settings
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.core.mail.message import EmailMessage

import numpy as np
import cv2
import json
import tensorflow as tf
# from .photo_key import photo_key

from django.http import HttpResponse

'''회원가입'''


@method_decorator(csrf_exempt, name='dispatch')
@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == 'POST':
        serializer = UserCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(email=serializer.validated_data['email']).first() is None:
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_409_CONFLICT)
    else:
        # return jsonify("result : true")
        pass


'''로그인'''


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({'message': 'Request Body Error.'}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['email'] == 'no user':
            return Response({'message': 'no user'}, status=status.HTTP_200_OK)
        if serializer.validated_data['email'] == 'None':
            return Response({'message': 'wrong password'}, status=status.HTTP_200_OK)

        response = {
            'message': 'login success',
            'token': serializer.data['token']
        }
        return Response(response, status=status.HTTP_200_OK)

# 모든 알약 정보


@api_view(['GET'])
def search_all(request):
    pill = InfoPill.objects.all()
    serializer = InfoPillSerializer(pill, many=True)

    return Response(serializer.data)

# 알약 직접 검색


@api_view(['GET'])
@permission_classes([AllowAny])
def search_direct(request):
    pill = InfoPill.objects.all()
    n = request.GET.get('n', "")  # 약 이름
    s = request.GET.get('s', "")  # 약 모양
    c_f = request.GET.get('c_f', "")  # 약 앞면 색상
    c_b = request.GET.get('c_b', "")  # 약 뒷면 색상
    # ?n= {약이름}으로 검색 시 해당 단어가 포함하면 반환해줌
    if n:
        pill = pill.filter(
            Q(item_name__contains=n) &
            Q(shape__contains=s) &
            Q(color_front__contains=c_f) &
            Q(color_back__contains=c_b)
        ).distinct()

        serializer = InfoPillSerializer(pill, many=True)
        return Response(serializer.data)
    else:
        return Response("해당하는 약 정보가 없습니다.")


'''카카오(OAuth)'''

# state = getattr(settings, 'STATE')

BASE_URL = 'http://localhost:8000/'
KAKAO_CALLBACK_URI = BASE_URL + 'api/login/kakao/callback'


def kakao_login(request):
    REST_API_KEY = os.environ.get("KAKAO_ID")
    REDIRECT_URI = "http://127.0.0.1:8000/api/login/kakao/callback"
    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code"
    )


def kakao_callback(request):
    code = request.GET.get("code")
    REST_API_KEY = os.environ.get("KAKAO_ID")
    REDIRECT_URI = "http://127.0.0.1:8000/api/login/kakao/callback"

    # Access Token Request
    token_request = requests.get(
        f"https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code"
    )
    token_request_json = token_request.json()
    error = token_request_json.get("error", None)
    if error is not None:
        raise JSONDecodeError(error)  # ??

    access_token = token_request_json.get("access_token")

    # Email Request
    profile_request = requests.get(
        "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"}
    )
    profile_json = profile_request.json()
    # 중간다리역할) kakao_account를 통해서 이메일 외에 여러 url을 가져올 수 있다(예. 카톡 프로필 이미지)
    kakao_account = profile_json.get('kakao_account')

    # print(kakao_account)
    email = kakao_account.get('email')

    if email is None:
        raise JSONDecodeError(error)

    # Signup or Signin Request
    try:
        user = User.objects.get(email=email)

        '''다른 SNS로 가입된 유저 
        (기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인)'''
        # social_user = SocialAccount.objects.get(user=user)
        # if social_user is None:
        #     return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        # if social_user.provider != 'kakao':
        #     return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

        '''기존에 Google로 가입된 유저'''
        # data = {'access_token': access_token, 'code': code}
        # accept = requests.post(
        #     f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        # accept_status = accept.status_code
        # if accept_status != 200:
        #     return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
        # accept_json = accept.json()
        # accept_json.pop('user', None)
        # return JsonResponse(accept_json)

    except User.DoesNotExist:
        '''기존에 가입된 유저가 없으면 새로 가입'''
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)


# class kakao_login_finish(SocialLoginView):
#     adapter_class = kakao_view.KakaoOAuth2Adapter
#     callback_url = KAKAO_CALLBACK_URI
#     client_class = OAuth2Client


# 알약 상세정보
'''
api/pill-detail/<int:pill_id>
api/pill-detail/?pill_id={품목일련번호}
'''


@api_view(['GET'])
@permission_classes([AllowAny])
def pill_detail(request):
    pill_data = request.GET.get('pill_id', "")  # item_num

    if pill_data is None:
        return Response("해당 품목일련번호가 없습니다.")

    pill = InfoPill.objects.all().filter(item_num=pill_data)

    serializer = InfoPillSerializer(pill, many=True)
    return Response(serializer.data)


# 유저 즐겨찾기 API


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_pill(request):
    content = {  # get으로 약 정보 확인하기 (지금은 유저로 돌림)
        'user': str(request.user.email),
    }

    user_email = request.user  # 유저 불러오기
    pill = InfoPill.objects.all()  # 약 정보 데이터 베이스 전부 가져오기
    pn = request.GET.get('pn', "")  # 약 넘버

    if request.method == 'GET':
        if pn:
            pill = pill.filter(
                Q(item_num__exact=pn)  # url 약 넘버 정확하게 일치한다면
            ).distinct()
            serializer = InfoPillSerializer(pill, many=True)

            content = {
                '유저': str(request.user.email),
                '알약': serializer.data
            }
            return Response(content)
        else:
            return Response('올바른 요청 값이 아닙니다.')

    if request.method == 'POST':
        if pn:
            pill = pill.filter(
                Q(item_num__exact=pn)  # url 약 넘버 정확하게 일치한다면
            ).distinct()
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(
                item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            # UserPill 테이블에 user_email과 pill_num 저장
            test = UserPill(user_email=user_email, pill_num=pill_num)
            test.save()  # 저장 22
            return Response(f'{serializer.data}를 성공적으로 즐겨찾기에 추가했습니다.')
        else:
            return Response('올바른 요청 값이 아닙니다.')  # 정확한 약 넘버가 들어오지 않다면!

    if request.method == 'DELETE':
        if pn:
            pill = pill.filter(
                Q(item_num__exact=pn)  # url 약 넘버 정확하게 일치한다면
            ).distinct()
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(
                item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            #test = UserPill(user_email=user_email, pill_num=pill_num)
            # UserPill 테이블에서 해당하는(pn) 값 삭제
            UserPill.objects.filter(
                user_email=user_email, pill_num=pill_num).delete()
            return Response("삭제 성공!")
        else:
            return Response("올바른 삭제 형식을 맞춰주세요.")

# 로그아웃 API


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

# 비밀번호 변경: 이메일 보내주는 함수 (테스트용)


def send_email(request):
    subject = "message"
    to = ["igmy1108@gmail.com"]
    from_email = "igmy1108@email.com"
    message = "메시지 테스트"
    EmailMessage(subject=subject, body=message,
                 to=to, from_email=from_email).send()
