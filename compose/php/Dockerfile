FROM php:8.2-fpm-alpine

RUN addgroup -g 1000 spot && adduser -G spot -g spot -s /bin/sh -D spot

RUN mkdir -p /var/www/html && chown -R spot:spot /var/www/html

WORKDIR /var/www/html

RUN apk add --no-cache \
    freetype \
    libpng \
    libjpeg-turbo \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    libsodium-dev \
    bzip2-dev \
    oniguruma-dev \
    libwebp-dev \
    $PHPIZE_DEPS

RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    NPROC=$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
    docker-php-ext-install -j${NPROC} gd pdo pdo_mysql zip sodium bz2 mbstring

RUN pecl install redis && docker-php-ext-enable redis

RUN apk del --no-cache freetype-dev libpng-dev libjpeg-turbo-dev

COPY ./compose/php/www.conf /usr/local/etc/php-fpm.d/www.conf

CMD ["php-fpm"]
