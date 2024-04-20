init-dev: docker-up \
	composer-i \
	artisan-migrate\
	artisan-seed\
	cc \
	npm-i

build: docker-build \
	   docker-up

up: docker-up

down: docker-down

restart: down up

docker-build:
	 docker-compose build

docker-up:
	 docker-compose up -d

docker-stop:
	 docker-compose stop

docker-down:
	 docker-compose down

composer-i:
	 docker-compose exec app composer install

composer-u:
	 docker-compose exec app composer update

composer-a:
	 docker-compose exec app composer dump-autoload

cc:
	 docker-compose exec app php artisan optimize:clear && \
	 docker-compose exec app php artisan config:cache

artisan-migrate:
	 docker-compose exec app php artisan migrate

tinker:
	 docker-compose exec app php artisan tinker

artisan-seed:
	 docker-compose exec app php artisan db:seed

seed-fresh:
	 docker-compose exec app php artisan migrate:fresh  && \
	 docker-compose exec app php artisan db:seed

npm-i:
	 docker-compose exec node npm install

npm-u:
	 docker-compose exec node npm update

npm-dev:
	 docker-compose exec node npm run dev

docker-rmi:
	docker image prune -a

docker-rm:
	docker container prune

docker-rmv:
	docker volume prune

