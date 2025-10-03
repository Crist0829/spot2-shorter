FROM nginx:stable-alpine

RUN addgroup -g 1000 spot && \
    adduser -D -G spot -u 1000 -s /sbin/nologin spot

RUN mkdir -p /var/www/html && chown -R spot:spot /var/www/html

ADD ./compose/nginx/local/nginx.conf /etc/nginx/nginx.conf
ADD ./compose/nginx/local/default.conf /etc/nginx/conf.d/default.conf
