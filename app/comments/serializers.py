from rest_framework import serializers
from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'username', 'body', 'post', 'created_on']
        read_only_fields = ('id', 'created_on', 'post')
