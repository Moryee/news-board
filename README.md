# news-board

## Description

This program like a social network where you can create user profile, create post, upvote and comment it.

## How to run

You must have ```Docker``` installed.

- Download this project.
- Open project root directory with terminal.
- Run ```docker-compose up -d --build```, to bring down containers ```docker-compose down -v```.
- After it started open http://localhost:3000/.
- Register on the site. If there is an error if there is a registration error "Something went wrong" you probably need to complicate password, I didn't add password validation on complexity to UI.

## Technical details

Project was done with:

- Python ~3.10
- Django REST Framework
- React with js
- Docker
- Postman (public workspace https://www.postman.com/omdb-api-got-team/workspace/news-board)
## Functional details

### Backend part

#### Posts

- There is posts model with filds: title, author, link, created_on, upvotes and function for counting votes. CRUD API for posts where unauthorized user can view posts, and only authorized author of the post can edit or delete it. Read only fields is: id, author, upvotes, created_on.
```
app/posts/models.py

class Post(models.Model):
    title = models.CharField(max_length=100, blank=False, default='')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    link = models.URLField(max_length=200, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    upvotes = models.ManyToManyField(User, related_name='posts', blank=True)

    def total_upvotes(self):
        return self.upvotes.count()
```
- Users can upvote post.
```
app/posts/views.py ln50

    @action(detail=True, methods=['post'])
    def upvote(self, request, pk=None):
        post = Post.objects.prefetch_related('upvotes').get(pk=pk)

        if post.upvotes.filter(pk=request.user.pk).count() == 0:
            post.upvotes.add(request.user)
        else:
            post.upvotes.remove(request.user)

        post_serializer = self.get_serializer(post)
        return Response(post_serializer.data, status=status.HTTP_200_OK)
```

#### Comments

- Comments consist of fields: author, post(fk), body, created_on. CRUD API such as posts' CRUD. But for GET and POST comments used ```posts/post_id/comments/```, and other endpoints is. ```comments/comment_id``` for retrieving/update/delete. Read only fields is: id, author, created_on, post.
```
app/comments/models.py

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
```

#### Authentication

- User uses bearer tokens for authorizing.

```
app/authentication/urls.py

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),

    path('login/', login_view, name='api-login'),
    path('logout/', logout_view, name='api-logout'),
]
```

#### Docker, celery and other

- Docker launches backend and frontend.
- Reccuring job implemented as celery beat that repeating every day at 1 AM.
```
app/docker-compose.yml ln34

    celery-beat:
        restart: always
        build: ./app
        command: celery -A base beat -l info
        volumes:
            - ./app/:/app/api/
        env_file:
            - ./.env.dev
        depends_on:
            - web
            - redis
```

```
app/base/settings.py ln182

CELERY_BEAT_SCHEDULE = {
    "reset_upvotes": {
        "task": "posts.tasks.reset_upvotes",
        "schedule": crontab(hour=1),
    },
}
```
- Project uses postgreSQL as database.
```
app/docker-compose.yml ln13

    db:
        image: postgres:14.5
        volumes:
            - postgres_data:/var/lib/postgresql/data/
        environment:
            - POSTGRES_USER=postgres
            - POSTGRES_PASSWORD=postgres
            - POSTGRES_DB=news_board_dev
```

### Frontend part

- React part of project uses store based structure(not Redux).
- Frontend part allows to use all backend functionality such as manipulate comments and posts data, login register.
