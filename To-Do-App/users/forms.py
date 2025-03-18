from django import forms
from .models import User

class UserRegistrationForm(forms.ModelForm):
    username = forms.CharField(min_length=8, max_length=32)
    email = forms.CharField(min_length=8, max_length=64)

    class Meta:
        model = User
        fields = ['username', 'email']
