from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.decorators import action
from rest_framework.response import Response

from posts.models import Post
from posts.serializers import PostSerializer
from comments.models import Comment
from comments.serializers import CommentSerializer


class IsAuthorOrIsAuthenticated(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return obj.author == request.user


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_on')
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['author', 'title']
    ordering_filter = '__all__'

    custom_permissions = {
        # CRUD
        'create': [IsAuthorOrIsAuthenticated],
        'update': [IsAuthorOrIsAuthenticated],
        'partial_update': [IsAuthorOrIsAuthenticated],
        'destroy': [IsAuthorOrIsAuthenticated],

        # Custom endpoints
        'upvote': [IsAuthenticated],
    }

    def get_permissions(self):
        try:
            # return custom permissions depending on `action`
            return [permission() for permission in self.custom_permissions[self.action]]
        except KeyError:
            # return default if there is no permission for current action
            return [permission() for permission in self.permission_classes]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def upvote(self, request, pk=None):
        post = Post.objects.prefetch_related('upvotes').get(pk=pk)

        if post.upvotes.filter(pk=request.user.pk).count() == 0:
            post.upvotes.add(request.user)
        else:
            post.upvotes.remove(request.user)

        post_serializer = self.get_serializer(post)
        return Response(post_serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        if request.method == 'GET':
            queryset = Comment.objects.filter(post=pk).order_by('-created_on')

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = CommentSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = CommentSerializer(page, many=True)
            return Response(serializer.data)
        elif request.method == 'POST':
            if not request.user.is_authenticated:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

            serializer = CommentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.validated_data['post'] = Post.objects.filter(pk=pk).first()
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
