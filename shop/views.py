from django.shortcuts import render, get_object_or_404, redirect
from .models import Category, Product, Profile
from cart.forms import CartAddProductForm
from django.contrib.auth.forms import UserCreationForm

from django.views.generic.edit import FormView, CreateView, DeleteView, UpdateView
from django.views.generic import ListView
from django.contrib.auth.views import LoginView

from .forms import RegisterUserForm, UserUpdateForm, ProfileUpdateForm

from django.urls import reverse_lazy

from django.contrib.auth.decorators import login_required
from django.db import transaction

from django.views.generic.detail import DetailView

from django.contrib.auth import logout

from django.http import HttpResponseRedirect

from django.contrib import messages

# Подключаем джсон
from django.http import JsonResponse, HttpResponse
import json

from django.core import serializers

def product_list(request, category_slug=None):
    # Список наших продуктов
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    if request.POST.get("filter_category"):
        # category = get_object_or_404(Category, slug=category_slug)
        category = request.POST.get('filter_category')
        current_category = Category.objects.get(name=category)
        productes = products.filter(category=current_category)
        # filter_products = products
        return HttpResponse(serializers.serialize('json', productes))
    return render(request,
                  'shop/product/list.html',
                      {'category': category,
                   'categories': categories,
                   'products': products})



def product_detail(request, id, slug):
    # детальных просмотр продукта
    product = get_object_or_404(Product,
                                id=id,
                                slug=slug,
                                available=True)
    cart_product_form = CartAddProductForm()
    return render(request, 'shop/product/detail.html', {'product': product,
                                                        'cart_product_form': cart_product_form})

class UserRegister(CreateView):
    # регистрация пользователя
    template_name = 'shop/input_acc/register.html'
    form_class = RegisterUserForm

    @login_required
    def get_redirect_url(self):
        self.next = super().get_redirect_url()
        if self.next:
            return self.next
            self.next = '/'
        return self.next


class UserLogin(LoginView):
    # Вход пользователя
    template_name = 'shop/input_acc/login.html'
    success_url = '/'

    def get_success_url(self):
        return self.success_url


class ProfileDetail(DetailView):
    # Профиль пользователя
    model = Profile
    context_object_name = "profile"
    template_name = 'shop/account/account.html'    

    def get_object(self):
        return Profile.objects.get(user__username=self.kwargs.get('slug'))

def slogout(request):
    # Вход пользователя если есть и возвращение на главную при входе
    logout(request)
    return HttpResponseRedirect('/')

def profile_update(request):
    # редактирование профиля.
    if request.method == 'POST':
        profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if profile_form.is_valid():
            profile_form.save()
            messages.success(request, ('Your profile was successfully updated!'))
            return HttpResponseRedirect('/')
        # else:
        #     messages.error(request, ('Please correct the error below.'))
    else:
        profile_form = ProfileUpdateForm(instance=request.user.profile)
    return render(request, 'shop/account/account_update.html', {
           'profile_form': profile_form })