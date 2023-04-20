from rest_framework.serializers import ModelSerializer
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