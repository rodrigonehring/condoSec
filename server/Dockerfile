FROM node:13.12.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN yarn --silent

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]