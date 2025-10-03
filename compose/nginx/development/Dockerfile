FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    freetype \
    libpng \
    libjpeg-turbo \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    nginx \
    nodejs \
    npm \
    curl \
    libzip-dev \
    zip \
    certbot \
    certbot-nginx \
    cronie \
    $PHPIZE_DEPS

RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql gd zip bcmath && \
    pecl install redis && docker-php-ext-enable redis && \
    apk del --no-cache freetype-dev libpng-dev libjpeg-turbo-dev $PHPIZE_DEPS

RUN addgroup -g 1000 ne && adduser -G ne -g ne -s /bin/sh -D ne && \
    mkdir -p /var/www/html && \
    chown -R ne:ne /var/www/html && \
    chown -R ne:ne /var/lib/nginx

RUN curl -sS https://getcomposer.org/installer | php -- --version=2.7.7 --install-dir=/usr/local/bin --filename=composer

RUN npm install -g pm2

WORKDIR /var/www/html

COPY --chown=ne:ne . .

USER ne
RUN composer install
RUN npm ci

USER root

COPY ./compose/nginx/development/laravel-cron /etc/cron.d/laravel-cron
RUN chmod 0644 /etc/cron.d/laravel-cron && crontab /etc/cron.d/laravel-cron


COPY ./compose/nginx/development/nginx.conf /etc/nginx/nginx.conf
COPY ./compose/nginx/development/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=ne:ne ./compose/nginx/development/ecosystem.config.cjs /var/www/html/ecosystem.config.cjs

EXPOSE 80 443

CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;' & crond && pm2-runtime ./compose/nginx/development/ecosystem.config.cjs"]
