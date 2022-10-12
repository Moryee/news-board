from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=100, blank=False, default='')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    link = models.URLField(max_length=200, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    upvotes = models.ManyToManyField(User, related_name='posts', blank=True)

    def total_upvotes(self):
        return self.upvotes.count()
