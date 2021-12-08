from django.conf.urls import include
from django.forms.models import fields_for_model
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer
from rest_framework_simplejwt.state import token_backend
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import update_last_login
from .models import InfoPill, UploadFileModel
from django import forms
from rest_auth.serializers import PasswordResetSerializer
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm


User = get_user_model()


class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["username"],
        )
        user.set_password(validated_data["password"])

        user.save()
        return user


class InfoPillSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoPill
        exclude = ["id"]


class ImageForm(forms.ModelForm):
    class Meta:
        model = UploadFileModel
        fields = "__all__"


class UserPillListSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoPill
        fields = (
            "item_num",
            "item_name",
            "image",
            "sungbun",
            "use_method_qesitm",
        )


class PillDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoPill
        fields = (
            "item_name",
            "image",
            "bit",
            "sungbun",
            "efcy_qesitm",
            "use_method_qesitm",
            "se_qesitm",
            "atpn_qesitm",
            "deposit_method_qesitm",
            "intrc_qesitm"
        )


# 토큰 obtain 커스터마이징
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # 페이로드 확장
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email  # 확장
        token['username'] = user.username  # 확장
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = str(self.user.username)

        return data


# 토큰 refresh 커스터마이징
class MyTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super(MyTokenRefreshSerializer, self).validate(attrs)
        decoded_payload = token_backend.decode(data['access'], verify=True)
        user_uid = decoded_payload['user_id']
        email = decoded_payload['email']
        username = decoded_payload['username']
        # add filter query
        data.update({
            'email': email,
            'username': username,
        })
        return data


class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': 'Token is invalid or expired'
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')
