import os
from django.core.mail import message
import requests
from django.core.checks.messages import Info
from django.db.models.expressions import RawSQL
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenViewBase, TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.shortcuts import redirect, reverse
from json.decoder import JSONDecodeError
from django.http import JsonResponse
from allauth.socialaccount.models import SocialAccount
from django.conf import settings
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.core.mail.message import EmailMessage
from django.contrib import auth
from datetime import datetime, timedelta, date
from sqlalchemy import create_engine
from sqlalchemy.sql import text

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
            User.objects.filter(email=serializer.validated_data["email"]).first()
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


"""카카오(OAuth)"""

# state = getattr(settings, 'STATE')

BASE_URL = "http://localhost:8000/"
KAKAO_CALLBACK_URI = BASE_URL + "api/login/kakao/callback"


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
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    profile_json = profile_request.json()
    # 중간다리역할) kakao_account를 통해서 이메일 외에 여러 url을 가져올 수 있다(예. 카톡 프로필 이미지)
    kakao_account = profile_json.get("kakao_account")

    # print(kakao_account)
    email = kakao_account.get("email")

    if email is None:
        raise JSONDecodeError(error)

    # Signup or Signin Request
    try:
        user = User.objects.get(email=email)

        """다른 SNS로 가입된 유저 
        (기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인)"""
        # social_user = SocialAccount.objects.get(user=user)
        # if social_user is None:
        #     return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        # if social_user.provider != 'kakao':
        #     return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

        """기존에 Google로 가입된 유저"""
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
        """기존에 가입된 유저가 없으면 새로 가입"""
        data = {"access_token": access_token, "code": code}
        accept = requests.post(f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({"err_msg": "failed to signup"}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        accept_json = accept.json()
        accept_json.pop("user", None)
        return JsonResponse(accept_json)


"""코치님이 말씀하신 백엔드가 3줄만 하면 된다는 코드"""
# class kakao_login_finish(SocialLoginView):
#     adapter_class = kakao_view.KakaoOAuth2Adapter
#     callback_url = KAKAO_CALLBACK_URI
#     client_class = OAuth2Client


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
        new_search_history = SearchHistory(user_email=user_email, pill_num=pill_num)
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
            pill = pill.filter(Q(item_num__exact=pn)).distinct()  # url 약 넘버 정확하게 일치한다면
            serializer = InfoPillSerializer(pill, many=True)

            content = {"유저": str(request.user.email), "알약": serializer.data}
            return Response(content)
        else:
            return Response("올바른 요청 값이 아닙니다.")

    if request.method == "POST":
        if pn:
            pill = pill.filter(Q(item_num__exact=pn)).distinct()  # url 약 넘버 정확하게 일치한다면
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            # UserPill 테이블에 user_email과 pill_num 저장
            test = UserPill(user_email=user_email, pill_num=pill_num)
            test.save()  # 저장 22
            return Response(f"{serializer.data}를 성공적으로 즐겨찾기에 추가했습니다.")
        else:
            return Response("올바른 요청 값이 아닙니다.")  # 정확한 약 넘버가 들어오지 않다면!

    if request.method == "DELETE":
        if pn:
            pill = pill.filter(Q(item_num__exact=pn)).distinct()  # url 약 넘버 정확하게 일치한다면
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            # test = UserPill(user_email=user_email, pill_num=pill_num)
            # UserPill 테이블에서 해당하는(pn) 값 삭제
            UserPill.objects.filter(user_email=user_email, pill_num=pill_num).delete()
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
    user_pill = UserPill.objects.filter(user_email=user_email).values_list("pill_num")
    pill = InfoPill.objects.filter(item_num__in=user_pill)

    serializer = UserPillListSerializer(pill, many=True)

    return Response(serializer.data)


# 비밀번호 변경: 이메일 보내주는 함수 (테스트용)


def send_email(request):
    subject = "message"
    to = ["igmy1108@gmail.com"]
    from_email = "igmy1108@email.com"
    message = "메시지 테스트"
    EmailMessage(subject=subject, body=message, to=to, from_email=from_email).send()


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

                img_trim = image[y : y + h, x : x + w]
                cv2.imwrite(f"{image_path}", img_trim)
        except:
            return Response("알약이 중앙에 위치하도록 사진을 다시 촬영하여주세요.")

        try:
            predict_list = []
            predict_img = cv2.imread(f"{image_path}")
            print(predict_img.shape)
            predict_img = (
                cv2.resize(predict_img, (224, 224), interpolation=cv2.INTER_LINEAR)
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
        return Response("최근 검색 기록이 없습니다.")

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


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenRefreshView(TokenViewBase):
    serializer_class = MyTokenRefreshSerializer
