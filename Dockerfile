FROM node

COPY package.json /app/
WORKDIR /app
RUN npm install

COPY ./src/ ./src
COPY ./build/ ./build
COPY ./config/ ./config
COPY ./static/ ./static

RUN npm run build
