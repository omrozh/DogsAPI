from django.core.management.base import BaseCommand
from django.utils import timezone
from ...get_breeds import getBreeds
from ...models import Dog


class Command(BaseCommand):
    create_db_data = getBreeds(True)
    for breed in create_db_data:
        new_dob_breed = Dog(breed_name=breed)
        new_dob_breed.save()
