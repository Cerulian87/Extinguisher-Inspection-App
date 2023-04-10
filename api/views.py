from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import TestSerializer

# Create your views here.
# from django.http import HttpResponse

# def index(request):
#     return HttpResponse("Hello World. This is the API index.")

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
        'Endpoint': '/api/',
        'method': 'GET',
        'body': None,
        'description': 'Return an arrow of stuff'
        }
    ]

    return Response(routes)

@api_view(['GET'])
def getStaffInfo(request):
    staffInformation = Staff.objects.all()
    serializer = TestSerializer(staffInformation, many=True)
    return Response(serializer.data)