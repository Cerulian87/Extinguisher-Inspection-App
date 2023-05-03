from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('staff/', views.getStaff),
    path('box/', views.getBox),
    path('users/', views.getUsers),
    path('checklist/', views.getChecklist),
    path('extinguishers/', views.getExtinguishers),
    path('inspAssignments/', views.getInspectorAssignments),
    path('inspector-assignments/<str:ext_id>/', views.deleteInspectorAssignment),
    path('myInspections/', views.getMyInspections),
    # path('notes/', views.getNotes),
    path('myBoxes/', views.getMyBoxes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
