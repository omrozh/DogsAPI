from django.db import models


class Dog(models.Model):
    breed_name = models.CharField(max_length=60)

