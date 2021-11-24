from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserCreateSerializer, UserLoginSerializer, InfoPillSerializer
from .models import User, InfoPill
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
import os
import requests
from django.shortcuts import redirect, reverse
from json.decoder import JSONDecodeError
from django.http import JsonResponse
from allauth.socialaccount.models import SocialAccount
from django.conf import settings
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

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
def search_direct(request):
    pill = InfoPill.objects.all()
    n = request.GET.get('n', "") # 약 이름
    s = request.GET.get('s', "") # 약 모양
    c_f = request.GET.get('c_f', "") # 약 앞면 색상
    c_b = request.GET.get('c_b', "") # 약 뒷면 색상
    # ?q= {약이름}으로 검색 시 해당 단어가 포함하면 반환해줌
    if n:
        pill = pill.filter(
            Q(item_name__icontains=n) &
            Q(shape__icontains=s) &
            Q(color_front__icontains=c_f) &
            Q(color_back__icontains=c_b)
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


'''코치님이 말씀하신 백엔드가 3줄만 하면 된다는 코드'''
# class kakao_login_finish(SocialLoginView):
#     adapter_class = kakao_view.KakaoOAuth2Adapter
#     callback_url = KAKAO_CALLBACK_URI
#     client_class = OAuth2Client


# 알약 상세정보 보여주기
@api_view(['POST'])
@permission_classes([AllowAny])
def pill_detail(request):
    pass
