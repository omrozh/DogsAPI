from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

# ------------------------------------------------------------ #


# ----------------------------------------------- #
# User Administration:
# ----------------------------------------------- #
admin.site.register(User, UserAdmin)
