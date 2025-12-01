from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings

class AccountManagement(BaseUserManager):
    
    def create_superuser(self, email, username, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser el campo de staff debe ser designado como verdadero(True)')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser el campo de superuser debe ser designado como verdadero(True)')
        
        return self.create_user(email, username, password, **other_fields)
    
    def create_user(self, email, username, password, **other_fields):
        if not email:
            raise ValueError('Email is missing')

        email = self.normalize_email(email)
        other_fields.setdefault('is_active', True) 

        user = self.model(email=email, username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user

            

class User(AbstractBaseUser, PermissionsMixin):

    UserID = models.AutoField(verbose_name='UserID', primary_key=True)
    email = models.EmailField(verbose_name='Email', max_length=60, unique=True)
    username = models.CharField(verbose_name='username', max_length=30, unique=True)
    is_active= models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    created= models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = AccountManagement()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"] 

    class Meta:
        verbose_name = "Accounts"
        verbose_name_plural = "Accounts"

    def __str__(self):
        return self.username
