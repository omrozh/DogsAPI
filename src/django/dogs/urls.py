from django.urls import path
from . import views

urlpatterns = [
    path('getdb/', views.genDatabase, name="getdb"),
    path('view_all_breeds/', views.getAllBreeds, name="view_all_breeds"),
    path("view_image/<breed>/<filename>", views.returnImage, name="view_image"),
    path("view_breed/<breed>/", views.getBreedImages, name="view_breed")
]
