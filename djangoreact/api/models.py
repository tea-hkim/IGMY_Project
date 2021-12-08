from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    customized User
    """

    email = models.EmailField(
        verbose_name=_("email id"), max_length=64, unique=True, help_text="EMAIL ID."
    )
    username = models.CharField(
        max_length=30,
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_(
            "Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    social_platform = models.CharField(max_length=20, null=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.username

    def get_short_name(self):
        return self.email


class InfoPill(models.Model):
    item_num = models.IntegerField(
        unique=True,
    )  # 품목일련번호
    item_name = models.CharField(
        max_length=200,
    )  # 품목명
    company_name = models.CharField(
        max_length=100,
    )  # 업소명
    image = models.URLField()  # 사진 링크
    shape = models.CharField(
        max_length=100,
    )  # 제형
    color_front = models.CharField(
        max_length=30,
    )  # 색상앞
    color_back = models.CharField(
        max_length=30,
    )  # 색상뒤
    bit = models.CharField(
        max_length=100,
    )  # 분류명
    prescription = models.CharField(
        max_length=30,
    )  # 전문일반구분
    sungbun = models.CharField(
        max_length=200,
    )  # 성분/함량/단위
    efcy_qesitm = models.TextField()  # 효능/효과
    use_method_qesitm = models.TextField()  # 용법/용량(하루 복용량)
    atpn_warn_qesitm = models.TextField()  # 알레르기 반응 일으킬  수 있는 질환군(warn)
    atpn_qesitm = models.TextField()  # 사용 시 주의사항(알레르기 반응 일으킬  수 있는 질환군)
    intrc_qesitm = models.TextField()  # 다른 약들과의 상호작용
    se_qesitm = models.TextField()  # 부작용(이상반응의 부분집합)
    deposit_method_qesitm = models.TextField()  # 보관 방법

    def __str__(self):
        return self.item_num


# 유저 즐겨찾기 모델


class UserPill(models.Model):
    user_email = models.ForeignKey(
        User, to_field="email", db_column="user_email", on_delete=models.CASCADE
    )
    pill_num = models.ForeignKey(
        InfoPill, to_field="item_num", db_column="pill_num", on_delete=models.CASCADE
    )


class UploadFileModel(models.Model):
    files = models.FileField(upload_to="images", null=True)
    upload_at = models.DateTimeField(auto_now=True)


# 검색 기록 모델
class SearchHistory(models.Model):
    user_email = models.ForeignKey(
        User, to_field="email", db_column="user_email", on_delete=models.CASCADE
    )
    pill_num = models.ForeignKey(
        InfoPill, to_field="item_num", db_column="pill_num", on_delete=models.CASCADE
    )
    create_at = models.DateField(auto_now_add=True)


