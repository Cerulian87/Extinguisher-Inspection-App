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



