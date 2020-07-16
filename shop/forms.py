from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile

class RegisterUserForm(UserCreationForm):
	class Meta:
		model = User
		fields = ('username', 'email')
		labels = {
			'username': 'Уникальное имя пользователя',
			'email': 'Адрес эл.почты',
		}

class UserUpdateForm(forms.ModelForm):
	email = forms.EmailField()

	class Meta:
		model = User
		fields = ['username', 'email']


class ProfileUpdateForm(forms.ModelForm):

	class Meta:
		model = Profile
		fields = ['avatar', 'username', 'last_name']