from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    upvotes = serializers.CharField(source='total_upvotes', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'username', 'title', 'link', 'upvotes', 'created_on']
        read_only_fields = ('id', 'created_on')
