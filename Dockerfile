FROM nginx:alpine

COPY public /usr/share/nginx/html

HEALTHCHECK CMD curl --fail http://localhost || exit 1


