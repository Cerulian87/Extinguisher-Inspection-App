from django.http import JsonResponse
from rest_framework import status
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
# @permission_classes([IsAuthenticated]) # <--- Not sure why I need authentication (Might add to everything just for security reasons...)
def getBox(request):
    box = Box.objects.all()
    serializer = BoxSerializer(box, many=True)
    return Response(serializer.data)

# @api_view(['PATCH'])
# def update_box_status(request, box_id):
#     try:
#         box = Box.objects.get(pk=box_id)
#     except Box.DoesNotExist:
#         return Response(status=404)

#     status_id = request.data.get('status_id')
#     if status_id is not None:
#         box.status_id = status_id
#         box.save()
#         return Response(status=200)
#     else:
#         return Response(status=400, data={'message': 'Missing or invalid status_id'})

@api_view(['PATCH'])
def update_box_status(request, box_id):
    try:
        box = Box.objects.get(pk=box_id)
    except Box.DoesNotExist:
        return Response(status=404)

    status_id = request.data.get('status_id')
    if status_id is not None:
        box.status_id_id = status_id
        box.save()
        return Response(status=200)
    else:
        return Response(status=400, data={'message': 'Missing or invalid status_id'})

@api_view(['PATCH'])
def maintExtUpdate(request, ext_id):
    try:
        extinguisher = Extinguisher.objects.get(pk=ext_id)
    except Extinguisher.DoesNotExist:
        return Response(status=404)

    status_id = request.data.get('status_id')
    if status_id is not None:
        extinguisher.status_id_id = status_id
        extinguisher.save()
        return Response(status=200)
    else:
        return Response(status=400, data={'message': 'Missing or invalid status_id'})

@api_view(['GET'])
def getExtinguishers(request):
    extinguishers = Extinguisher.objects.all()
    serializer = ExtinguisherSerializer(extinguishers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getExtForBox(request, ext_id):
    extinguishers = Extinguisher.object.get(ext_id=ext_id)
    serializer = ExtinguisherSerializer(extinguishers, many=True)
    return Response(serializer.data)

# This is for testing in order to retrieve entries specific to a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBoxes(request):
    user = request.user
    extstatuses = user.extstatus_set.all()
    # extstatuses = ExtStatus.objects.all()
    serializer = ExtSerializer(extstatuses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getStaff(request):
    staff = Staff.objects.all()
    serializer = StaffSerializer(staff, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyInspections(request):
    user = request.user
    assignments = InspectorAssignments.objects.filter(username=user.username)
    serializer = InspectorAssignmentsSerializer(assignments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getChecklist(request):
    checklist = Checklist.objects.all()
    serializer = ChecklistSerializer(checklist, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getFloorPlan(request):
    floorplan = FloorPlan.objects.all()
    serializer = FloorPlanSerializer(floorplan, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def update_extinguisher_status(request, ext_id):
    try:
        extinguisher = Extinguisher.objects.get(ext_id=ext_id)
    except Extinguisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        # Get the list of selectedOptions from the request
        selected_options = request.data.get('selectedOptions')
        if not isinstance(selected_options, list):
            return Response({'error': 'selectedOptions must be a list'}, status=status.HTTP_400_BAD_REQUEST)
        # Check if any selected option is "fail"
        is_any_fail = any(option == 'fail' for option in selected_options)
        # Set the status_id based on whether any option is fail or not
        status_id = "2" if is_any_fail else "1"
        # Update the extinguisher status_id
        extinguisher.status_id_id = status_id
        extinguisher.save()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['GET', 'POST'])
def getInspectorAssignments(request):
    if request.method == 'GET':
        inspAssignments = InspectorAssignments.objects.all()
        serializer = InspectorAssignmentsSerializer(inspAssignments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = request.data
        username = data.get('username')
        if not username:
            return Response({'error': 'username is required'}, status=status.HTTP_400_BAD_REQUEST)
        assignments = data.get('assignments')
        if not assignments:
            return Response({'error':'assignments are required'}, status=status.HTTP_400_BAD_REQUEST)
        extinguishers = assignments.get('extinguishers', [])
        # extinguishers = Extinguisher.objects.get(ext_id=ext_id)
        if not extinguishers:
            return Response({'error': 'extinguishers are required'}, status=status.HTTP_400_BAD_REQUEST)
        inspector_assignments = []
        for ext_id in extinguishers:
            try:
                extinguisher = Extinguisher.objects.get(ext_id=ext_id)
                inspector_assignment = InspectorAssignments(ext_id=extinguisher, username=username)
                inspector_assignment.save()
                inspector_assignments.append(inspector_assignment)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer = InspectorAssignmentsSerializer(inspector_assignments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

@api_view(['DELETE'])
def deleteInspectorAssignment(request, ext_id):
    try:
        inspector_assignment = InspectorAssignments.objects.get(ext_id=ext_id)
        inspector_assignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except InspectorAssignments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


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
