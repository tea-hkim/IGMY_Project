# backend Dockerfile

FROM python:3.8.10
ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN apt-get -y install vim
RUN apt-get install ffmpeg libsm6 libxext6  -y

RUN mkdir /backend
ADD . /backend

WORKDIR /backend

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install gunicorn

EXPOSE 8000



# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]