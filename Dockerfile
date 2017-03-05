FROM node

COPY package.json /app/
WORKDIR /app
RUN npm install

COPY ./src/ ./src
COPY ./build/ ./build
COPY ./config/ ./config
COPY ./static/ ./static
COPY ./.babelrc ./.babelrc
COPY ./.eslintrc.js ./.eslintrc.js
COPY ./index.html ./index.html

RUN npm run build

EXPOSE 5000
CMD npm run start:prod
