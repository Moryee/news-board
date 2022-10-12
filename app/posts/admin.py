from django.contrib import admin
from posts.models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('id', )
    list_display = ('title', 'author', 'link', 'created_on')
    filter_horizontal = ('upvotes',)
