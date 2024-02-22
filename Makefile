build:
	docker build -t google-oauth2-front:latest .

tag:
	docker tag google-oauth2-front:latest docker.io/gamepkw/google-oauth2-front:latest

push:
	docker push gamepkw/google-oauth2-front:latest

stop:
	docker stop google-oauth2-front-container || true

remove:
	docker rm google-oauth2-front-container || true

run:
	docker run -d -p 3001:3001 --name google-oauth2-front-container google-oauth2-front:latest


#make build && make tag && make push && make stop && make remove && make run
#make build && make stop && make remove && make run