from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager




class ChatUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class ChatUser(AbstractBaseUser):
    username = None
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    nickname = models.CharField(max_length=30)
    displaying_name = models.CharField(max_length=30)
    is_admin = models.BooleanField(default=False)
    avatar = models.CharField(max_length=20)
    objects = ChatUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
