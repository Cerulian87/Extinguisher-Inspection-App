from rest_framework.serializers import ModelSerializer
from api.models import *

class BoxSerializer(ModelSerializer):
    class Meta:
        model = Box
        fields = '__all__'

class ExtSerializer(ModelSerializer):
    class Meta:
        model = ExtStatus
        fields = '__all__'

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'