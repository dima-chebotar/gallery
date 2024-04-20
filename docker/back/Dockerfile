FROM php:8.2-fpm

# Copy composer.lock and composer.json
COPY composer.lock composer.json /var/www/app/

## Install dependencies
RUN apt-get update && apt-get install -y \
   git \
   curl \
   libpng-dev \
   libonig-dev \
   libxml2-dev \
   zip \
   libzip-dev \
   libpq-dev \
   unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
#
# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip pdo pdo_pgsql pgsql && \
pecl install xdebug && \
docker-php-ext-enable xdebug




# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY . /var/www/app

# Copy existing application directory permissions
COPY --chown=www:www . /var/www/app

# Change current user to www
USER www


# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
