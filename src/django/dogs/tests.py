from django.test import TestCase
from .models import Dog


class AddDog(TestCase):
    def setUp(self):
        Dog.objects.create("My Dog")

    def filterDog(self):
        my_dog = Dog.objects.get(name="My Dog")
