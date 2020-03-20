from django.contrib.auth.models import AbstractUser

# ------------------------------------------------------------ #


# ----------------------------------------- #
# Authentication Models:
# ----------------------------------------- #
class User(AbstractUser):
    """
    An object to represent an individual user for the platform. This can allow for an extension to the built in default
    User object that Django provides.
    """

    pass
