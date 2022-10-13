from django.core.management.base import BaseCommand
from posts.tasks import reset_upvotes


class Command(BaseCommand):
    help = 'Reset upvotes'

    def handle(self, *args, **options):
        reset_upvotes.delay()
