import os
import requests
from .serializers import *
from .models import *
from django.core.mail import message
from django.core.mail.message import EmailMessage
from django.core.checks.messages import Info
from django.conf import settings
from django.db.models.expressions import RawSQL
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenViewBase, TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.shortcuts import redirect, reverse
from json.decoder import JSONDecodeError
from django.http import JsonResponse, HttpResponse
from django.contrib import auth
from datetime import datetime, timedelta, date
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.generics import GenericAPIView
from django.contrib.auth.views import PasswordResetView
from django.utils import timezone


user = settings.DATABASES["default"]["USER"]
password = settings.DATABASES["default"]["PASSWORD"]
host = settings.DATABASES["default"]["HOST"]
port = settings.DATABASES["default"]["PORT"]
name = settings.DATABASES["default"]["NAME"]

url = "postgresql+psycopg2://{}:{}@{}:{}/{}"
url = url.format(user, password, host, port, name)

engine = create_engine(url)

# import numpy as np
# import cv2
# import json
# import tensorflow as tf
# from .photo_key import photo_key


"""회원가입"""


@method_decorator(csrf_exempt, name="dispatch")
@api_view(["POST"])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == "POST":
        serializer = UserCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response(
                {"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT
            )

        if (
            User.objects.filter(
                email=serializer.validated_data["email"]).first()
            is None
        ):
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_200_OK)
    else:
        # return jsonify("result : true")
        pass


# 모든 알약 정보


@api_view(["GET"])
def search_all(request):
    pill = InfoPill.objects.all()
    serializer = InfoPillSerializer(pill, many=True)

    return Response(serializer.data)


# 알약 직접 검색


@api_view(["GET"])
@permission_classes([AllowAny])
def search_direct(request):
    name = request.GET.get("n")  # 약 이름
    shape = request.GET.get("s")  # 약 모양
    color_front = request.GET.get("c_f")  # 약 앞면 색상

    # 만약 ?n={약이름} 이랑 모양, 앞면 색상으로 검색 시 해당 이름과 모양, 색상이 포함된 값을 반환해줌
    query_all = ""

    shape_query = ""
    if shape:
        shape_query = f"shape = '{shape}' AND "
        query_all += shape_query

    name_query = ""
    if name:
        name = "%{}%".format(name)
        name_query = f"item_name LIKE '{name}' AND "
        query_all += name_query

    color_front_query = ""
    if color_front:
        color_front = "%{}%".format(color_front)
        color_front_query = f"color_front LIKE '{color_front}' AND "
        query_all += color_front_query

    if not query_all == "":
        query_all = query_all[:-4]
        query_all = "SELECT * FROM api_infopill WHERE " + query_all
        pill = engine.execute(text(query_all))
        serializer = InfoPillSerializer(pill, many=True)
        return Response(serializer.data)

    return Response([])


# 알약 상세정보
@api_view(["GET"])
@permission_classes([AllowAny])
def pill_detail(request):
    """
    약 이름 = item_name
    사진 링크 = image
    분류명 = bit
    성분/함량/단위 = sungbun
    효능/효과 = efcy_qesitm
    용법/용량 = use_method_qesitm
    부작용(이상반응의 부분집합) = se_qesitm
    사용 시 주의사항 = atpn_qesitm
    보관 방법 = deposit_method_qesitm
    타 악과의 상호작용 = intrc_qesitm
    """
    pill_id = request.GET.get("pill_id", "")

    if pill_id is None:
        return Response("해당 품목일련번호가 없습니다.")

    pill = InfoPill.objects.filter(item_num=pill_id)
    # 로그인 한 유저가 없는 경우
    if request.user.is_anonymous:
        serializer = PillDetailSerializer(pill, many=True)

        return Response(serializer.data)
    else:
        # 로그인 한 유저가 있는 경우: 검색 기록 추가
        user_email = request.user
        old_search_history = SearchHistory.objects.filter(
            Q(user_email=user_email) & Q(pill_num=pill_id)
        ).first()
        # 같은 알약 기록이 이미 있는 경우
        if old_search_history is not None:
            serializer = PillDetailSerializer(pill, many=True)
            return Response(serializer.data)
        # 같은 알약 기록이 없는 경우
        pill_num = InfoPill.objects.get(item_num=pill_id)
        new_search_history = SearchHistory(
            user_email=user_email, pill_num=pill_num)
        new_search_history.save()

        serializer = PillDetailSerializer(pill, many=True)

        return Response(serializer.data)


# 유저 즐겨찾기 API


@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def user_pill(request):
    content = {  # get으로 약 정보 확인하기 (지금은 유저로 돌림)
        "user": str(request.user.email),
    }

    user_email = request.user  # 유저 불러오기
    pill = InfoPill.objects.all()  # 약 정보 데이터 베이스 전부 가져오기
    pn = request.GET.get("pn", "")  # 약 넘버

    if request.method == "GET":
        if pn:
            # url 약 넘버 정확하게 일치한다면
            pill = pill.filter(Q(item_num__exact=pn)).distinct()
            serializer = InfoPillSerializer(pill, many=True)

            content = {"유저": str(request.user.email), "알약": serializer.data}
            return Response(content)
        else:
            return Response("올바른 요청 값이 아닙니다.")

    if request.method == "POST":
        if pn:
            # url 약 넘버 정확하게 일치한다면
            pill = pill.filter(Q(item_num__exact=pn)).distinct()
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(
                item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            # UserPill 테이블에 user_email과 pill_num 저장
            test = UserPill(user_email=user_email, pill_num=pill_num)
            test.save()  # 저장 22
            return Response(f"{serializer.data}를 성공적으로 즐겨찾기에 추가했습니다.")
        else:
            return Response("올바른 요청 값이 아닙니다.")  # 정확한 약 넘버가 들어오지 않다면!

    if request.method == "DELETE":
        if pn:
            # url 약 넘버 정확하게 일치한다면
            pill = pill.filter(Q(item_num__exact=pn)).distinct()
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(
                item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            # test = UserPill(user_email=user_email, pill_num=pill_num)
            # UserPill 테이블에서 해당하는(pn) 값 삭제
            UserPill.objects.filter(
                user_email=user_email, pill_num=pill_num).delete()
            return Response("삭제 성공!")
        else:
            return Response("올바른 삭제 형식을 맞춰주세요.")


# 유저가 즐겨찾기 한 목록 보여주는 API


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_pill_list(request):
    """
    필요한 반환 리스트: PillInfo
    약 이름 = item_name
    사진 링크 = image
    성분/함량 = sungbun
    하루 복용량 = use_method_qesitm
    """

    user_email = request.user.email
    user_pill = UserPill.objects.filter(
        user_email=user_email).values_list("pill_num")
    pill = InfoPill.objects.filter(item_num__in=user_pill)

    serializer = UserPillListSerializer(pill, many=True)

    return Response(serializer.data)


# 비밀번호 변경: 이메일 보내주는 함수 (테스트용)


def send_email(request):
    subject = "message"
    to = ["igmy1108@gmail.com"]
    from_email = "igmy1108@email.com"
    message = "메시지 테스트"
    EmailMessage(subject=subject, body=message,
                 to=to, from_email=from_email).send()


# 준 왓 이즈 디스?


@method_decorator(csrf_exempt, name="dispatch")
@api_view(["POST"])
@permission_classes([AllowAny])
def result_photo(request):
    form = ImageForm(request.POST, request.FILES)
    pill = InfoPill.objects.all()
    if form.is_valid():
        image_name = form.save()
        image_path = f"{image_name.files}"
        try:
            response = requests.post(
                "https://sdk.photoroom.com/v1/segment",
                data={"bg_color": "#000000"},
                headers={"x-api-key": f"{photo_key}"},
                files={"image_file": open(f"{image_path}", "rb")},
            )

            response.raise_for_status()
            with open(f"{image_path}", "wb") as f:
                f.write(response.content)
        except:
            return Response("이미지 형식의 파일을 올려주세요.")

        try:
            img_array = np.fromfile(f"{image_path}", np.uint8)
            image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
            image_gray = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
            number = np.ones_like(image_gray) * 255
            mul = cv2.multiply(image_gray, number)
            contours, _ = cv2.findContours(
                mul, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
            )
            contours_xy = np.array(contours)
            for i in range(len(contours_xy)):
                if len(contours_xy[i]) < 10:
                    continue
                x_min, x_max = 0, 0
                value = list()
                for j in range(len(contours_xy[i])):
                    value.append(contours_xy[i][j][0][0])
                    x_min = min(value)
                    x_max = max(value)

                y_min, y_max = 0, 0
                value = list()
                for j in range(len(contours_xy[i])):
                    value.append(contours_xy[i][j][0][1])
                    y_min = min(value)
                    y_max = max(value)

                x = x_min
                y = y_min
                w = x_max - x_min
                h = y_max - y_min

                img_trim = image[y: y + h, x: x + w]
                cv2.imwrite(f"{image_path}", img_trim)
        except:
            return Response("알약이 중앙에 위치하도록 사진을 다시 촬영하여주세요.")

        try:
            predict_list = []
            predict_img = cv2.imread(f"{image_path}")
            print(predict_img.shape)
            predict_img = (
                cv2.resize(predict_img, (224, 224),
                           interpolation=cv2.INTER_LINEAR)
                / 255
            )
            predict_list.append(predict_img)
            predict_list = np.array(predict_list)

            model = tf.keras.models.load_model("model")
            predict = model.predict(predict_list)
            num = str(np.argmax(predict[0], axis=0))

            pill = pill.filter(
                Q(item_num__exact=pill_dict[num])  # url 약 넘버 정확하게 일치한다면
            ).distinct()
            serializer = InfoPillSerializer(pill, many=True)

            content = {
                "1.알약": serializer.data,
                "1.확률": "{:.2f}%".format(round(predict[0][int(num)] * 100, 2)),
            }

            return Response(content)

        except:
            return Response("인공지능 모델을 불러오지 못했습니다.")

    else:
        return Response("파일을 선택해주세요.")


# 검색 기록
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_history(request):
    user_email = str(request.user.email)
    data = SearchHistory.objects.filter(user_email=user_email).all().count()

    if data == 0:
        return Response({"message": "최근 검색 기록이 없습니다."})

    old_history = (
        SearchHistory.objects.filter(
            Q(user_email=user_email)
            & Q(create_at__lte=date.today() - timedelta(days=7))
        )
        .all()
        .count()
    )

    # 일주일 지난 기록이 있는 경우
    if old_history > 0:
        SearchHistory.objects.filter(
            Q(user_email=user_email)
            & Q(create_at__lte=date.today() - timedelta(days=7))
        ).all().delete()

        history_pill_list = (
            SearchHistory.objects.filter(user_email=user_email)
            .all()
            .values_list("pill_num")
            .order_by("id")[:9]
        )
        pills = InfoPill.objects.filter(item_num__in=history_pill_list)
        serializer = UserPillListSerializer(pills, many=True)

        return Response(serializer.data)

    # 일주일이 지난 기록이 없는 경우
    history_pill_list = (
        SearchHistory.objects.filter(user_email=user_email)
        .all()
        .values_list("pill_num")
        .order_by("id")[:9]
    )
    pills = InfoPill.objects.filter(item_num__in=history_pill_list)

    serializer = UserPillListSerializer(pills, many=True)

    return Response(serializer.data)


# 사진 검색 API
# with open('./AI/pill_90.json', 'r') as f:
#     pill_dict = json.load(f)

# @method_decorator(csrf_exempt, name='dispatch')
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def result_photo(request):
#     form = ImageForm(request.POST, request.FILES)
#     pill = InfoPill.objects.all()
#     if form.is_valid():
#         image_name = form.save()
#         image_path = f'{image_name.files}'
#         try:
#             response = requests.post(
#             'https://sdk.photoroom.com/v1/segment',
#             data={'bg_color': '#000000'},
#             headers={'x-api-key': f'{photo_key}'},
#             files={'image_file': open(f'{image_path}', 'rb')},
#             )

#             response.raise_for_status()
#             with open(f'{image_path}', 'wb') as f:
#                 f.write(response.content)
#         except:
#             return Response("이미지 형식의 파일을 올려주세요.")

#         try:
#             img_array = np.fromfile(f"{image_path}", np.uint8)
#             image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
#             image_gray = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
#             number = np.ones_like(image_gray) * 255
#             mul = cv2.multiply(image_gray, number)
#             contours, _ = cv2.findContours(mul, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#             contours_xy = np.array(contours)
#             for i in range(len(contours_xy)):
#                 if len(contours_xy[i]) < 10:
#                     continue
#                 x_min, x_max = 0,0
#                 value = list()
#                 for j in range(len(contours_xy[i])):
#                     value.append(contours_xy[i][j][0][0])
#                     x_min = min(value)
#                     x_max = max(value)

#                 y_min, y_max = 0,0
#                 value = list()
#                 for j in range(len(contours_xy[i])):
#                         value.append(contours_xy[i][j][0][1])
#                         y_min = min(value)
#                         y_max = max(value)

#                 x = x_min
#                 y = y_min
#                 w = x_max-x_min
#                 h = y_max-y_min

#                 img_trim = image[y:y+h, x:x+w]
#                 cv2.imwrite(f"{image_path}", img_trim)
#         except:
#             return Response("알약이 중앙에 위치하도록 사진을 다시 촬영하여주세요.")

#         try:
#             predict_list = []
#             predict_img = cv2.imread(f'{image_path}')
#             print(predict_img.shape)
#             predict_img = cv2.resize(predict_img, (224, 224), interpolation=cv2.INTER_LINEAR)/255
#             predict_list.append(predict_img)
#             predict_list = np.array(predict_list)

#             model = tf.keras.models.load_model('model')
#             predict = model.predict(predict_list)
#             num = str(np.argmax(predict[0], axis=0))

#             pill = pill.filter(
#                     Q(item_num__exact=pill_dict[num]) # url 약 넘버 정확하게 일치한다면
#                     ).distinct()
#             serializer = InfoPillSerializer(pill, many=True)

#             content = {
#                 '1.알약': serializer.data,
#                 '1.확률':  '{:.2f}%'.format(round(predict[0][int(num)]*100, 2))
#             }

#             return Response(content)


#         except:
#             return Response("인공지능 모델을 불러오지 못했습니다.")


#     else:
#         return Response("파일을 선택해주세요.")


# 로그인 유지를 위한 토큰 유효성 검사 api
# @api_view(["GET"])
# @permission_classes([AllowAny])
# def check_token(request):
#     print('user:', request.user)
#     if request.user.is_authenticated:
#         result = {
#             'username': str(request.user),
#             'email': str(request.user.email),
#             'token': str(request.META['HTTP_AUTHORIZATION']).split(' ')[1]
#         }
#         return Response(result)

#     return Response("토큰이 유효하지 않습니다.")


'''OAuth : social login'''

state = getattr(settings, 'STATE')

BASE_URL = "http://localhost:8000/"

KAKAO_CALLBACK_URI = BASE_URL + "api/login/kakao/callback/"
GOOGLE_CALLBACK_URI = BASE_URL + 'api/login/google/callback/'


def get_tokens_for_user(user):
    refreshToken = RefreshToken.for_user(user)
    accessToken = refreshToken.access_token
    return (accessToken, refreshToken)


'''kakao'''


@api_view(["GET"])
@permission_classes([AllowAny])
def kakao_login(request):
    REST_API_KEY = getattr(settings, 'KAKAO_REST_API_KEY')
    REDIRECT_URI = KAKAO_CALLBACK_URI
    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code"
    )


def kakao_callback(request):
    code = request.GET['code']

    KAKAO_CLIENT_ID = getattr(settings, 'KAKAO_REST_API_KEY')
    REDIRECT_URI = KAKAO_CALLBACK_URI

    # request로 받은 code로 access_token 받아오기
    access_token_request_uri = 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code'
    access_token_request_uri += '&client_id=' + KAKAO_CLIENT_ID
    access_token_request_uri += '&code=' + code
    access_token_request_uri += '&redirect_uri=' + REDIRECT_URI

    access_token_request_uri_data = requests.get(access_token_request_uri)
    json_data = access_token_request_uri_data.json()  # json 형태로 데이터 저장

    # return JsonResponse(json_data)  # test : 확인
    '''
    {"access_token": "EhBhF9LKxyiVu_qQQ1P7URdtRGRuo4cFixDArgopb9UAAAF9hqkO4A", "token_type": "bearer", "refresh_token": "1DaoZjX9LGVvqNlCUV8T1rV7hjy37IeaD6hw4Qopb9UAAAF9hqkO3g", "expires_in": 21599, "scope": "account_email profile_image talk_message profile_nickname", "refresh_token_expires_in": 5183999}
    '''
    access_token = json_data['access_token']  # 액세스 토큰 꺼내와서 저장
    refresh_token = json_data['refresh_token']

    # Authorization(인가코드) : header로 꼭 설정해야함 (카카오는 인가코드 기반으로 토큰을 요청, 받음)
    headers = {
        'Authorization': f"Bearer {access_token}",
    }

    # return JsonResponse(headers)  # test : 인가코드 확인
    '''
    {"Authorization": "Bearer ucaAFsNVvw6QTVdr6qDIxZaUtUOiSURBG3Balgo9c5oAAAF9hqqm1A"}
    '''

    # Authorization(프론트에서 받은 토큰)을 이용해서 회원의 정보를 확인하기 위한 카카오 API 주소
    user_profile_info_uri = 'https://kapi.kakao.com/v2/user/me'
    # API를 요청하여 회원의 정보를 user_profile_info에 저장
    user_profile_info = requests.get(user_profile_info_uri, headers=headers)

    json_data = user_profile_info.json()  # 회원 정보를 json형태로 불러옴

    # return JsonResponse(json_data)  # test : 확인
    '''
    {
        "id": 2003367790, 
        "connected_at": "2021-11-23T00:48:16Z", 
        "properties": {
            "nickname": "\uac15\uc11d\uc601", 
            "profile_image": "http://k.kakaocdn.net/dn/b5NyPn/btrkz4wgIhn/zA3lMIXWu1cSlh7qeAsLKk/img_640x640.jpg", 
            "thumbnail_image": "http://k.kakaocdn.net/dn/b5NyPn/btrkz4wgIhn/zA3lMIXWu1cSlh7qeAsLKk/img_110x110.jpg"
        }, 
        "kakao_account": {
            "profile_nickname_needs_agreement": false, 
            "profile_image_needs_agreement": false, 
            "profile": {
                "nickname": "\uac15\uc11d\uc601", 
                "thumbnail_image_url": "http://k.kakaocdn.net/dn/cGnCMx/btrmKlB3UyN/0WKCOQ8p30n6CzoxqpT9lK/img_110x110.jpg", 
                "profile_image_url": "http://k.kakaocdn.net/dn/cGnCMx/btrmKlB3UyN/0WKCOQ8p30n6CzoxqpT9lK/img_640x640.jpg", 
                "is_default_image": false
            }, 
            "has_email": true, 
            "email_needs_agreement": false, 
            "is_email_valid": true, 
            "is_email_verified": true, 
            "email": "sy7434@naver.com"
        }
    }
    '''
    # 이메일과 닉네임 데이터 가져옴
    email = json_data['kakao_account']['email']
    nickname = json_data['kakao_account']['profile']['nickname']

    # return HttpResponse(nickname)  # test : 확인

    '''db에 이미 저장되어있는 회원인지 확인'''
    if User.objects.filter(
        email=email,
        social_platform="kakao"
    ).exists():
        user_info = User.objects.get(email=email)
        # return HttpResponse("이미 존재하는 회원") # test : 확인
    else:
        user_info = User.objects.create(
            email=email,
            username=nickname,
            date_joined=timezone.now(),
            social_platform="kakao",
        )
        user_info.save()
        # return HttpResponse("새로운 회원") # test : 확인

    # return HttpResponse(user_info.{field}) # test : 확인

    '''방법1'''
    access_token, refresh_token = get_tokens_for_user(user_info)

    # return HttpResponse(f"{access_token} & {refresh_token}")  # test : 확인
    '''
    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM4Njk1NDA3LCJqdGkiOiIxNmNjZGNmNjU0MDU0ZjIxODFiNDM5MDBiZGYwNDVjMyIsInVzZXJfaWQiOjh9.PHTiHha6HuCX_OL1QN40K1tnDxvE9GpN_02uOYKwdiU 
    & 
    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzOTI5OTkwNywianRpIjoiM2I1YmVjMTE3NDIzNDg0NWExMWFmYjNkYTA2ZmU3YWYiLCJ1c2VyX2lkIjo4fQ.hytURuJpGYrmON5hF31pYmBWo9p9J9Enri_WUId--Ao
    '''

    expires_at = (
        timezone.now()
        + getattr(settings, "SIMPLE_JWT", None)["ACCESS_TOKEN_LIFETIME"]
    )

    # user_data = {  # jwt토큰, 이름, 타입 프론트엔드에 전달
    #     "access_token": access_token,
    #     "refresh_token": refresh_token,
    #     "user_email": user_info.email,
    #     "user_name": user_info.username,
    # "social_platform": user_info.social_platform,
    #     "expires_at": expires_at,
    # }

    return JsonResponse(
        {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user_email": user_info.email,
            "user_name": user_info.username,
            "social_platform": user_info.social_platform,
            "expires_at": expires_at,
        },
        status=200,
    )

    JsonResponse(
        {
            "access_token": access_token,
            "user_email": email,
        },
        status=200,
    )

    # refresh_token을 저장 및 재업데이트? 재설정? 해주는 코드도 필요하지 않을까?

    '''방법2'''
    # 토큰 발행
    # payload = JWT_PAYLOAD_HANDLER(user)
    # jwt_token = JWT_ENCODE_HANDLER(payload)

    # response = {
    #     'success': True,
    #     'token': jwt_token
    # }

    # return Response(response, status=200)


'''google'''


@api_view(["GET"])
def google_login(request):
    '''
    [google_login 실행]
    이 함수와 매핑된 url로 들어가면, client_id, redirect uri 등과 같은 정보를 url parameter로 함께 보내 리다이렉트한다. 그러면 구글 로그인 창이 뜨고, 알맞은 아이디, 비밀번호로 진행하면 Callback URI로 Code값이 들어가게 된다.
    '''
    scope = "https://www.googleapis.com/auth/userinfo.email"
    client_id = getattr(settings, "SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&response_type=code&redirect_uri={GOOGLE_CALLBACK_URI}&scope={scope}")


def google_callback(request):
    client_id = getattr(settings, "SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    client_secret = getattr(settings, "SOCIAL_AUTH_GOOGLE_SECRET")
    state = request.GET.get('state')
    code = request.GET.get('code')

    token_req = requests.post(
        f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_CALLBACK_URI}&state={state}")
    token_req_json = token_req.json()  # 구글 이용해서 토큰 발급

    # return JsonResponse(token_req_json)  # test : 토큰 발급 확인
    '''
    {"access_token": "ya29.a0ARrdaM__pStUlEmYcB_Mmf0Pr9Y_8X4WqUWidFGKKm96ow_9hT77n2FD2x_upk1PAL7KT-oi8ys1GcJWnY4odfd0nnlrcIU2dyWB1zUKLl-enNhp-Eni1et9nSHEcOr7b8JQKWnE7A_nO6kGCbMC8YIrYgEA", "expires_in": 3599, "scope": "https://www.googleapis.com/auth/userinfo.email openid", "token_type": "Bearer", "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFhYmM0MDkyYjZmYzAzOGU0MDNjOTEwMjJkZDNlNDQ1MzliNTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzU5NjM1NjMwNTEtdXY4dDVkNjg5ZTZlZXJjaGdlZHBkdTJmMzZidGhqNDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzU5NjM1NjMwNTEtdXY4dDVkNjg5ZTZlZXJjaGdlZHBkdTJmMzZidGhqNDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI5MDE5MzY3MDAwNjU4NDY1MTIiLCJlbWFpbCI6ImtzZ2UxMTI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUGs3dnlHTHhncnhOdkkwdHBkc0hEQSIsImlhdCI6MTYzODY0MjM2NywiZXhwIjoxNjM4NjQ1OTY3fQ.S2_rF9FZeELOnDhBoKxQSIeAfN4_VLTmnh9ZAvTYDbrlNSZEqQjN71h-3pM32pXGt2zGfmq_ajZ9EkboK_FXAQKxBqjORDn17bAreDUmb-MTymUqBQFbOq4M4lnmMSXMS2i8qxYqpACun_E_uA06qNqYXE8cYGkfgxDVIkDEk4z5JPwt2ktyiyUTap9VjPG1SJY7GAXU8JRdrsAZmbD20mP2rsCb9z0Y8SEiauJgqvT5wW0CprfnJFE0fjbniBr3swnRgQHCfM4Xp_daf4Jcrbm5NiZTTO_Eq9lPhzBOaf9ZkgXe_3Dmqd9qrvhek-nnmnt_FPukMyHeh8Yw5Udlig"}
    
    OR

    {"error": "invalid_scope",
    "error_description": "AADSTS70011: The provided value for the input parameter 'scope' is not valid. The scope https://foo.microsoft.com/mail.read is not valid.\r\nTrace ID: 255d1aef-8c98-452f-ac51-23d051240864\r\nCorrelation ID: fb3d2015-bc17-4bb9-bb85-30c5cf1aaaa7\r\nTimestamp: 2016-01-09 02:02:12Z",
    "error_codes": [70011], "timestamp": "2016-01-09 02:02:12Z", "trace_id": "255d1aef-8c98-452f-ac51-23d051240864", "correlation_id": "fb3d2015-bc17-4bb9-bb85-30c5cf1aaaa7"}
    '''

    error = token_req_json.get("error", None)

    if error is not None:
        raise JSONDecodeError(error)

    access_token = token_req_json.get("access_token")  # access_token만 추출
    # 구글에서 refresh_token은 처음 회원가입시에만 발급된다.

    '''[발급된 Access Token을 이용해서 Email 값을 Google에게 요청]'''
    email_req = requests.get(
        f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")

    email_req_status = email_req.status_code  # 제대로 들어가면 200 반환
    # return HttpResponse(email_req_status)  # test : 200 나오는거 확인

    if email_req_status != 200:
        return JsonResponse(
            {'err_msg': 'failed to get email'},
            status=status.HTTP_400_BAD_REQUEST
        )

    email_req_json = email_req.json()  # json형태로 프로필 값 가져오기

    # return JsonResponse(email_req_json)  # test : 확인
    '''
    {"issued_to": "775963563051-uv8t5d689e6eerchgedpdu2f36bthj45.apps.googleusercontent.com", "audience": "775963563051-uv8t5d689e6eerchgedpdu2f36bthj45.apps.googleusercontent.com",
        "user_id": "112901936700065846512", "scope": "https://www.googleapis.com/auth/userinfo.email openid", "expires_in": 3598, "email": "ksge1124@gmail.com", "verified_email": true, "access_type": "online"}
    '''

    email = email_req_json.get('email')  # 그 중 email필드 가져옴 (username필드는? 없나?)
    # username = email_req_json.get('name')  # ?????

    # return HttpResponse(email)  # test : ksge1124@gmail.com 나오는거 확인

    '''
    [Email, Access Token, Code를 바탕으로 회원가입/로그인 진행]
    1. 해당 email과 동일한 Email이 User 테이블에 있는지 확인
    (결국 SocialAccount테이블도 User테이블을 참조하기 때문에!)
    2-1. 만약 있다면?(try)
        - FK로 연결되어있는 SocialAccount 테이블에서 이메일의 유저가 있는지 체크
        - 없으면 일반 계정이므로, 에러 메세지와 함께 400 리턴
        - 있지만 다른 Provider로 가입되어 있으면 에러 메세지와 함께 400 리턴
        - 위 두개에 걸리지 않으면 로그인 진행, 해당 유저의 JWT 발급, 그러나 도중에
            예기치 못한 오류가 발생하면 에러 메세지와 함께 오류 Status 응답
    2-2. 없다면 (신규 유저이면)
        - 회원가입 진행 및 해당 유저의 JWT 발급
        - 그러나 도중에 예기치 못한 오류가 발생하면 에러 메세지와 함께 오류 Status응답
    '''
    try:
        user = User.objects.get(email=email)
        social_user = SocialAccount.objects.get(
            user=user)  # 소셜로그인으로 회원가입 했는지 여부 확인

        # social_user.last_login = timezone.now()
        # social_user.save()
        # expires_at = (timezone.now()+getattr(settings, "SIMPLE_JWT", None)["ACCESS_TOKEN_LIFETIME"])

        # 이메일은 있지만 social user가 아님
        if social_user is None:
            return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)

        # google에서 찾을 수 없음
        if social_user.provider != 'google':
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

        # 기존에 Google로 가입된 유저
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}api/login/google/finish/", data=data)

        accept_status = accept.status_code

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)

        accept_json = accept.json()
        accept_json.pop('user', None)  # ?

        # return JsonResponse(accept_json)
        # jwt토큰 프론트엔드에 전달
        return JsonResponse(
            {
                "access_token": access_token,
                "user_email": email,
            },
            status=200,
        )

    # .save()해줘야 함
    except User.DoesNotExist:
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}api/login/google/finish/", data=data)
        accept_status = accept.status_code

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)

        accept_json = accept.json()
        accept_json.pop('user', None)  # ?

        # return JsonResponse(accept_json)
        # jwt토큰 프론트엔드에 전달
        return JsonResponse(
            {
                "access_token": access_token,
                "user_email": email,
            },
            status=200,
        )
        '''
        토큰 발급 완료
        {"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM4MjkyNTg1LCJpYXQiOjE2MzgyOTIyODUsImp0aSI6IjViY2Y4YTQ2ZjRjZTRhODM4N2Q3ZTk4YmIzYzZjZTg0IiwidXNlcl9pZCI6NTV9.5IENJTLfMARy2AmXRTvXxGvVT9x2gHZykfbHqo17v9w",
            "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzODg5NzA4NSwiaWF0IjoxNjM4MjkyMjg1LCJqdGkiOiJiMWY5OTkzYTM2OWQ0YTIxYTNiOTU1YTBkNTNiMmZjMSIsInVzZXJfaWQiOjU1fQ._tRNLQnXlX5p-dSzTOuzcF6sag5TqJJk53OTdMcyYWo"}
        '''


class GoogleLogin(SocialLoginView):
    adapter_class = google_view.GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenRefreshView(TokenViewBase):
    serializer_class = MyTokenRefreshSerializer


# refresh 토큰을 blacklist로 올리는 api
class LogoutView(GenericAPIView):
    serializer_class = RefreshTokenSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid(raise_exception=True)
        sz.save()
        return Response("로그아웃 성공", status=status.HTTP_204_NO_CONTENT)
