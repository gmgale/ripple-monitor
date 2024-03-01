run-dev:
	docker-compose up db &
	docker-compose up rabbitmq &
	cd api && npm run start:dev &
	cd listener && npm run start:dev