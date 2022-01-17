from django.urls import path
from . import views

urlpatterns = [
    path('getdb/', views.genDatabase),
    path('view_all_breeds/', views.getAllBreeds),
    path("view_image/<breed>/<filename>", views.returnImage),
    path("view_breed/<breed>/", views.getBreedImages)
]
