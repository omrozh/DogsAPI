[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)

# Python Django Test.

## Installation.

1. Clone the repository.
2. Install each of the following onto your local system:
   - [docker](https://docs.docker.com/install/)
   - [docker-compose](https://docs.docker.com/compose/install/)
3. Navigate back to the project's root directory and run "docker-compose build". This will build out the project into its relevant docker containers.
4. Once the containers are built, run "docker-compose up" to start the project.
   - It is likely that the first time you up your containers Django will attempt to start before the database container has finished initialising its data volumes. If this should occur simply wait for MySQL to finish, down the containers, and then re-up them once again.
5. The MySQL database container has port 3001 automatically exposed on your local machine. This should allow you to connect via workbench (or another piece of software,) to quickly import a suitable database export.

## Project URLs.

    Local: http://localhost:8000
    Develop:
    Staging:
    Production:

    Administration: [Environment URL]/admin

## Tasks.

Your tasks here are relatively simple, but should sufficiently test you knowledge of working with both Python and the Django framework. We'll be asking you to consume, store, and sort various pieces of data from [Dog API](https://dog.ceo/dog-api/documentation/).

Here are the goals we'd like you to achieve:

1. Construct a management command that iterates through the list of breeds from Dog API. Each breed returned should be stored in the local database, along side the last 100 media assets provided for each breed.
   - Images returned by the API **must** be stored locally, rather than just their remote URL.
2. Create two API endpoints.
   - One should return a list of all dog breeds that are currently held within the database and their current image count.
   - The second should be able to take in the name of a dog breed and a number of images, returning the URLs to their locally stored assets as a JSon response.

Django management commands can be run from the project's root directory in the following fashion:

    docker-compose run --rm django python manage.py << command >>

Finally, all work **must** be committed to a feature branch for review.

Good luck!
