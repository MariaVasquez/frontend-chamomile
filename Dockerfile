FROM nginx:1.25.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY dist/chamomile /usr/share/nginx/html

EXPOSE 80

CMD [“nginx”, “-g”, “daemon off;”]
