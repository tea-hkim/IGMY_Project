from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserCreateSerializer, UserLoginSerializer, InfoPillSerializer
from .models import User, InfoPill
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q

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

# 모든 알약 정보
@api_view(['GET'])
def search_all(request):
    pill = InfoPill.objects.all()
    serializer = InfoPillSerializer(pill, many=True)

    return Response(serializer.data)

# 알약 직접 검색
@api_view(['GET'])
def search_direct(request):
    pill = InfoPill.objects.all()
    n = request.GET.get('n', "") # 약 이름
    s = request.GET.get('s', "") # 약 모양
    c_f = request.GET.get('c_f', "") # 약 앞면 색상
    c_b = request.GET.get('c_b', "") # 약 뒷면 색상
    # ?q= {약이름}으로 검색 시 해당 단어가 포함하면 반환해줌
    if n:
        pill = pill.filter(
            Q(item_name__icontains=n) &
            Q(shape__icontains=s) &
            Q(color_front__icontains=c_f) &
            Q(color_back__icontains=c_b)
            ).distinct()

        serializer = InfoPillSerializer(pill, many=True)
        return Response(serializer.data)
    else:
        return Response("해당하는 약 정보가 없습니다.")
    
