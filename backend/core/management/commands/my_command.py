from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Your custom command help message'

    def handle(self, *args, **options):
        # Your command logic goes here
        self.stdout.write(self.style.SUCCESS('Successfully ran your custom command'))
