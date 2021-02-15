FROM alpine:3.13

LABEL maintainer="mcmurrough1dan@gmail.com"

RUN  apk add --update nodejs nodejs-npm
RUN apk add --update ca-certificates
COPY build /usr/local/philosophia/home
COPY package.json /usr/local/philosophia/home
WORKDIR /usr/local/philosophia/home
RUN npm install
RUN npm install -g serve

CMD ["serve","-s", "build"]  