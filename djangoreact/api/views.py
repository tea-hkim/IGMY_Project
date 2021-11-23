import os
import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserCreateSerializer, UserLoginSerializer
from .models import User

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from django.shortcuts import redirect, reverse

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


'''로그인'''


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({'message': 'Request Body Error.'}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['email'] == 'None':
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)

        response = {
            'success': 'True',
            'token': serializer.data['token']
        }
        return Response(response, status=status.HTTP_200_OK)


'''카카오(OAuth)'''


def kakao_login(request):
    client_id = os.environ.get("KAKAO_ID")
    redirect_uri = "http://127.0.0.1:8000/api/login/kakao/callback"
    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
    )


class KakaoException(Exception):
    pass


def kakao_callback(request):
    try:
        code = request.GET.get("code")
        client_id = os.environ.get("KAKAO_ID")
        redirect_uri = "http://127.0.0.1:8000/users/login/kakao/callback"
        token_request = requests.get(
            f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
        )
        token_json = token_request.json()
        error = token_json.get("error", None)
        if error is not None:
            raise KakaoException()

        access_token = token_json.get("access_token")
        profile_request = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        profile_json = profile_request.json()
        email = profile_json.get("kakao_account").get("email")
        properties = profile_json.get("properties")
        nickname = properties.get("nickname")
        # profile_image = (profile_json.get("kakao_account").get("profile").get("profile_image_url"))

        # profile_image = profile_json.get("properties").get("profile_image")

        # properties = profile_json.get("kakao_account").get("profile")
        # nickname = properties.get("nickname")
        # profile_image = properties.get("profile_image_url")

        if email is None:
            raise KakaoException()
        try:
            user = User.objects.get(email=email)
            if user.login_method != User.LOGING_KAKAO:
                raise KakaoException()
        except User.DoesNotExist:
            user = User.objects.create(
                email=email,
                username=email,
                first_name=nickname,
                login_method=User.LOGING_KAKAO,
                email_verified=True,
            )
            user.set_unusable_password()
            user.save()

            # if profile_image is not None:
            #     photo_request = requests.get(profile_image)
            #     user.avatar.save(
            #         f"{nickname}-avatar", ContentFile(photo_request.content)
            #     )

        login(request, user)
        return redirect("")
    except KakaoException:
        return redirect(reverse("api:login"))
