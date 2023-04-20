from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *
from api.models import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name

        staff = Staff.objects.filter(username=user).first()
        emp_type = None

        if staff:
            emp_type = staff.emp_type_id
            token['staff'] = {
                'staff_id': staff.staff_id,
                'status': staff.emp_status,
                }
        
        if emp_type:
            token['emptype'] = emp_type.role_desc


        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBox(request):
    box = Box.objects.all()
    serializer = BoxSerializer(box, many=True)
    return Response(serializer.data)

# This is for testing in order to retrieve entries specific to a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBoxes(request):
    user = request.user
    extstatuses = user.extstatus_set.all()
    serializer = ExtSerializer(extstatuses, many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     note = Note.objects.all()
#     serializer = NoteSerializer(note, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)
