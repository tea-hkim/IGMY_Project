from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserCreateSerializer, UserLoginSerializer, InfoPillSerializer
from .models import User, InfoPill

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# 회원가입 
@method_decorator(csrf_exempt, name='dispatch')
@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == 'POST':
        serializer = UserCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(email=serializer.validated_data['email']).first() is None:
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_409_CONFLICT)

# 로그인
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({'message': 'Request Body Error.'}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['email'] == 'None':
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)
        
        response = {
            'success': 'True',
            'token': serializer.data['token']
        }
        return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_info_pill(request):
    pill = InfoPill(item_name="가스디알정50밀리그램(디메크로틴산마그네슘)")
    serializer = InfoPillSerializer(pill)

    return Response(serializer.data)

@api_view(['GET'])
def search_direct(request):
    pill = InfoPill()
    serializer = InfoPillSerializer(pill)

    return Response(serializer.data)