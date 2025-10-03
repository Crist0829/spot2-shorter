FROM php:8.2-cli-alpine

RUN addgroup -g 1000 spot && adduser -G spot -g spot -s /bin/sh -D spot
RUN chown -R spot:spot /var/www/html
RUN apk add --no-cache \
    libzip-dev \
    libsodium-dev \
    bzip2-dev \
    oniguruma-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    freetype-dev \
    libwebp-dev \
    git \
    unzip
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install -j$(nproc) gd zip sodium bz2 mbstring

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
ENTRYPOINT ["composer"]