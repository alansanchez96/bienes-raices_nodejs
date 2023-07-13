FROM node:lts-alpine

WORKDIR /var/www/

COPY package*.json .

RUN npm install

COPY . .

RUN apk update && \
    apk add --no-cache supervisor

RUN mkdir -p /var/log/supervisor

COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8080

CMD [ "supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]