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
    path('box/<str:box_id>/', views.update_box_status),
    path('users/', views.getUsers),
    path('checklist/', views.getChecklist),
    path('floorplan/', views.getFloorPlan),
    path('extinguishers/', views.getExtinguishers),
    path('extinguishers/<str:ext_id>/', views.update_extinguisher_status),
    path('maintExtinguisher/<str:ext_id>/', views.maintExtUpdate),
    path('maintExtinguisher/<str:ext_id>/sendToTech/', views.sendExtinguisherToTech),
    path('ext-for-box/<str:ext_id>/', views.getExtForBox),
    path('inspAssignments/', views.getInspectorAssignments),
    path('inspector-assignments/<str:ext_id>/', views.deleteInspectorAssignment),
    path('myInspections/', views.getMyInspections),
    path('techInspections/', views.getTechExtinguishers),
    path('addNewExtinguisher/', views.addNewExtinguisher),
    path('sendExtinguisherToTech/', views.sendExtinguisherToTech),
    path('warehouseInspections/<str:ext_id>/', views.getWarehouseInspections),
    path('myBoxes/', views.getMyBoxes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
