#!/bin/sh
# Simplistic script that fires up the project.

# Delete all .pvc files within the project.
find . -name \*.pyc -delete

# Sleep for a few seconds to allow for MySQL to fire up.
sleep 1 && python manage.py runserver 0.0.0.0:8000 --verbosity 2
