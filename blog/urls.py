from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.home, name='home'),
    path('posts/', views.blog_list, name='blog_list'),
    path('post/<slug:slug>/', views.post_detail, name='post_detail'),
    path('destinations/', views.destination_list, name='destination_list'),
    path('destination/<slug:slug>/', views.destination_detail, name='destination_detail'),
    path('gallery/', views.gallery, name='gallery'),
    path('about/', views.about, name='about'),
    path('search/', views.search, name='search'),
]
