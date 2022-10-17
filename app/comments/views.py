from rest_framework import viewsets, filters, mixins
from django_filters.rest_framework import DjangoFilterBackend
from posts.views import IsAuthorOrIsAuthenticated

from comments.models import Comment
from comments.serializers import CommentSerializer


class CommentViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Comment.objects.all().order_by('-created_on')
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    custom_permissions = {
        # CRUD
        'update': [IsAuthorOrIsAuthenticated],
        'partial_update': [IsAuthorOrIsAuthenticated],
        'destroy': [IsAuthorOrIsAuthenticated],
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.custom_permissions[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    search_fields = ['author']
    ordering_filter = '__all__'
