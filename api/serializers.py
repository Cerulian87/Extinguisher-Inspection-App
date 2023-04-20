from rest_framework.serializers import ModelSerializer
from .models import * 

# More testing was done here. Not relevant for actual app



class TestSerializer(ModelSerializer):
    class Meta:
        model = Staff
        # fields = ['emp_type_id', 'staff_id', 'f_name', 'l_name', 'address', 'email', 'emp_status']
        fields = '__all__'

