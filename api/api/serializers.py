from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from api.models import *

# ----- Thus far, these serializers are for testing purposes and are irrelevant -----


class BoxSerializer(ModelSerializer):
    class Meta:
        model = Box
        fields = '__all__' # Cannot use __all__ if any data is an int() type

class ExtSerializer(ModelSerializer):
    class Meta:
        model = ExtStatus
        fields = '__all__'

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class ChecklistSerializer(ModelSerializer):
    class Meta:
        model = Checklist
        fields = '__all__'

class ExtinguisherSerializer(ModelSerializer):
    class Meta:
        model = Extinguisher
        fields = '__all__'

# class UserSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'first_name']

class StaffSerializer(ModelSerializer):
    username = serializers.CharField(source='username.username')
    class Meta:
        model = Staff
        fields = '__all__'

class InspectorAssignmentsSerializer(ModelSerializer):
    # extinguisher = ExtinguisherSerializer()
    # username = serializers.CharField(source='username.username')
    class Meta:
        model = InspectorAssignments
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'