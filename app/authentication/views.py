from rest_framework import generics
from rest_framework.permissions import AllowAny

from django.views.decorators.csrf import requires_csrf_token
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.serializers import RegisterSerializer


@api_view(['POST'])
@requires_csrf_token
def login_view(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)
    login(request, user)

    refresh = RefreshToken.for_user(user)
    return Response({
        'username': user.username,
        'email': user.email,
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    })


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})
