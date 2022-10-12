from rest_framework import viewsets, filters, mixins
from django_filters.rest_framework import DjangoFilterBackend
from posts.views import IsAuthorOrIsAuthenticated

from comments.models import Comment
from comments.serializers import CommentSerializer


class CommentViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Comment.objects.all().order_by('-created_on')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthorOrIsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['author']
    ordering_filter = '__all__'
