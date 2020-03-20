"""
WSGI config for django project.

It exposes the WSGI callable as a module-level variable named ``application``.
"""


# ----------------------------------------------- #
# WSGI Initialisation:
# ----------------------------------------------- #
import os
import sys

from django.core.wsgi import get_wsgi_application
from django.db.backends.signals import connection_created
from django.dispatch import receiver

# Append the project folder into the system path.
sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir)
    )
)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "application.settings")

application = get_wsgi_application()


@receiver(connection_created)
def setup_mysql(connection, **kwargs):
    """
    Event function that is fired each time a database connection is made. Here we set the connection to have a maximum
    execution time in order to prevent long blockages of the Gunicorn threads.

    By setting this here in the WSGI file, we avoid adding these restrictions to our other processes like cron jobs.
    """
    # If the database connection is not using MySQL, exit early.
    if connection.vendor != "mysql":
        return

    # Timeout statements after 15 seconds.
    with connection.cursor() as cursor:
        cursor.execute("SET SESSION MAX_EXECUTION_TIME=15000;")
