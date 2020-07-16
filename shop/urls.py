from django.urls import path, re_path	
from django.conf.urls import url,include
from . import views
from django.contrib.auth import logout

# Сериализация 

urlpatterns = [
	path('login', views.UserLogin.as_view(), name='login'),
	path('register/', views.UserRegister.as_view(), name='register'),
	path('account/<slug:slug>/', views.ProfileDetail.as_view(), name='account'),
	path('update', views.profile_update, name='profile_update'),
	re_path('logout', views.slogout, name='slogout'),
    url(r'^$', views.product_list, name='product_list'),
    url(r'^(?P<category_slug>[-\w]+)/$', views.product_list, name='product_list_by_category'),
    url(r'^(?P<id>\d+)/(?P<slug>[-\w]+)/$', views.product_detail, name='product_detail'),
]