import os
import environ
from pathlib import Path
from datetime import datetime, timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-788$x$hv@n*dzud$08r-_-i11kn!e-fv#1$*mlk+%*2-$3!wby"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Additional Django apps
    "django.contrib.sites",
    # CORS 관련
    "corsheaders",
    # my app
    "api",
    # django-rest-framework
    "rest_framework",
    "rest_framework.authtoken",
    # djangorestframework-simplejwt
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    # dj-rest-auth
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "rest_auth",
    # django-allauth
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.kakao",
    # 'allauth.socialaccount.providers.github',
    # 'allauth.socialaccount.providers.google',
    # 비밀번호 변경
    "djoser",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # CORS 관련
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # 'django.middleware.csrf.CsrfViewMiddleware',
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "frontend", "build"),  # 경로 변경
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# 경로 추가
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend", "build", "static"),
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "team6",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com",
        "PORT": "5000",
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_L10N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# drf 설정
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_PERMISSION_CLASSES": (
        # "rest_framework.permissions.IsAuthenticated",
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        "rest_framework.permissions.AllowAny",
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],
}


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
}

# api 어플의 User 클래스 사용
AUTH_USER_MODEL = "api.User"


# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

SITE_ID = 1

REST_USE_JWT = True

"""gmail을 통해 사용자의 비밀번호 재설정 메일 보내주기 설정"""
# 메일을 호스트하는 서버
EMAIL_HOST = "smtp.gmail.com"
# gmail과의 통신하는 포트
EMAIL_PORT = "587"
# 발신할 이메일
EMAIL_HOST_USER = "igmy1108@gmail.com"
# 발신할 메일의 비밀번호
EMAIL_HOST_PASSWORD = "igmy2021!@"
# TLS 보안 방법
EMAIL_USE_TLS = True
# 사이트와 관련한 자동응답을 받을 이메일 주소
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'SET_USERNAME_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user_create': 'api.serializers.UserCreateSerializer',
        'user': 'api.serializers.UserCreateSerializer',
        'current_user': 'api.serializers.UserCreateSerializer',
    }
}