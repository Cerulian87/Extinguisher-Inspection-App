from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import TestSerializer
from django.http import JsonResponse
import json 

# ------ Everything here was used for testing and can be deleted... Actual views is in api/api/views.py ------


# Create your views here.
# from django.http import HttpResponse

# def index(request):
#     return HttpResponse("Hello World. This is the API index.")

# @api_view(['GET'])
# def getRoutes(request):

#     routes = [
#         {
#         'Endpoint': '/api/',
#         'method': 'GET',
#         'body': None,
#         'description': 'Return an arrow of stuff'
#         }
#     ]

#     return Response(routes)

# @api_view(['GET'])
# def getStaffInfo(request):
#     staffInformation = Staff.objects.all()
#     serializer = TestSerializer(staffInformation, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# @csrf_exempt
# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)
#             return JsonResponse({'status': 'success', 'message': 'Login Successful'})
#             # return redirect('https://www.google.com/')
#         else:
#             return JsonResponse({'status': 'error', 'message': 'Invalid Request'})
        
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid request'})
#     # return JsonResponse({'message': 'Invalid Reqeuest'})

# views.py

# @csrf_exempt
# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'success': True, 'message': 'Login successful'})
#         else:
#             return JsonResponse({'success': False, 'message': 'Invalid username or password'})
#     else:
#         return JsonResponse({'success': False, 'message': 'Invalid request method'})

