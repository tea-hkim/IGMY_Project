# frontend Dockerfile

FROM node:16.13.1

WORKDIR /frontend
COPY . /frontend
ARG API_URL
ENV APP_HOST_IP_ADDRESS $API_URL
RUN yarn
RUN yarn build


# FROM nginx

# RUN mkdir /frontend
# WORKDIR /frontend

# RUN mkdir ./build
# ADD ./build ./build

# ARG API_URL
# ENV REACT_APP_HOST_IP_ADDRESS $API_URL

# RUN rm /etc/nginx/conf.d/default.conf

# COPY ./nginx.conf /etc/nginx/conf.d

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]