from celery import shared_task
from celery.utils.log import get_task_logger


logger = get_task_logger(__name__)


@shared_task
def reset_upvotes():
    from posts.models import Post
    for post in Post.objects.prefetch_related('upvotes'):
        post.upvotes.clear()
    logger.info('Uvotes were reset')
