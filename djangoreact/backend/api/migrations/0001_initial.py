import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(help_text='EMAIL ID.', max_length=64, unique=True, verbose_name='email id')),
                ('username', models.CharField(max_length=30)),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('social_platform', models.CharField(max_length=20, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            managers=[
                ('objects', api.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='InfoPill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_num', models.IntegerField(unique=True)),
                ('item_name', models.CharField(max_length=200)),
                ('company_name', models.CharField(max_length=100)),
                ('image', models.URLField()),
                ('shape', models.CharField(max_length=100)),
                ('color_front', models.CharField(max_length=30)),
                ('color_back', models.CharField(max_length=30)),
                ('bit', models.CharField(max_length=100)),
                ('prescription', models.CharField(max_length=30)),
                ('sungbun', models.CharField(max_length=100)),
                ('efcy_qesitm', models.TextField()),
                ('use_method_qesitm', models.TextField()),
                ('atpn_warn_qesitm', models.TextField()),
                ('atpn_qesitm', models.TextField()),
                ('intrc_qesitm', models.TextField()),
                ('se_qesitm', models.TextField()),
                ('deposit_method_qesitm', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='UploadFileModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('files', models.FileField(null=True, upload_to='images')),
                ('upload_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserPill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pill_num', models.ForeignKey(db_column='pill_num', on_delete=django.db.models.deletion.CASCADE, to='api.infopill', to_field='item_num')),
                ('user_email', models.ForeignKey(db_column='user_email', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, to_field='email')),
            ],
        ),
        migrations.CreateModel(
            name='SearchHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateField(auto_now_add=True)),
                ('pill_num', models.ForeignKey(db_column='pill_num', on_delete=django.db.models.deletion.CASCADE, to='api.infopill', to_field='item_num')),
                ('user_email', models.ForeignKey(db_column='user_email', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, to_field='email')),
            ],
        ),
    ]
