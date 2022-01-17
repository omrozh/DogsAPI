from django.shortcuts import redirect
from .models import Dog
from os import listdir
from .get_breeds import getBreeds
from django.http import JsonResponse, HttpResponse


def genDatabase(req):
    create_db_data = getBreeds()
    for breed in create_db_data:
        new_dob_breed = Dog(breed_name=breed)
        new_dob_breed.save()
    return redirect("/dogs/view_all_breeds")


def getAllBreeds(req):
    all_breeds = Dog.objects.all()
    breed_dict = {}
    for breed in all_breeds:
        breed_dict[breed.breed_name] = len(listdir(f"./dog_images/{breed.breed_name}"))
    return JsonResponse(breed_dict)


def getBreedImages(req, breed):
    breed_dict = {
        "files": []
    }
    for file in listdir(f"./dog_images/{breed}"):
        breed_dict["files"].append(f"/view_image/{breed}/{file}")

    return JsonResponse(breed_dict)


def returnImage(req, breed, filename):
    image_file = open(f"./dog_images/{breed}/{filename}", "rb")
    image_data = image_file.read()
    image_file.close()
    return HttpResponse(image_data, content_type="image/jpeg")
