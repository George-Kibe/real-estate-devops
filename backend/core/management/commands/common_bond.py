from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Displays a simple Hello, World! message'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Hello, World!'))
