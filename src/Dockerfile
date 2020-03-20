FROM python:3.6

LABEL vendor="Dare"
LABEL description="Django container for the Python Django test exercise."
LABEL version="1.0"
LABEL contact="techteam@thisisdare.com"

# Set environment variables.
ENV APP_ROOT=/www \
    PYTHONUNBUFFERED=1

# Install our system pre-requirements.
RUN apt-get update && \
    apt-get -y --no-install-recommends upgrade && \
    apt-get -y --no-install-recommends install software-properties-common \
    build-essential

# Create our application directory.
RUN mkdir ${APP_ROOT}

WORKDIR ${APP_ROOT}

COPY django ${APP_ROOT}/django

# Install our required Python libs.
WORKDIR ${APP_ROOT}/django

RUN pip install --upgrade pip && pip install -r requirements.txt

# Switch the working directory back to the application's root.
WORKDIR ${APP_ROOT}/django

# Call for the start-up script to be run on container up.
CMD "./scripts/start-up.sh"
