FROM node:18-alpine

WORKDIR /data

COPY db.json .

RUN npm install -g json-server

EXPOSE 5000

ENTRYPOINT [ "json-server", "--watch", "db.json", "--host", "0.0.0.0", "-p", "5000" ]