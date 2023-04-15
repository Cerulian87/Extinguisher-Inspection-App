from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.getRoutes, name='routes'),
    path('last', views.getStaffInfo, name='last'),
    # path('login/', views.login_view, name='login'),
]
