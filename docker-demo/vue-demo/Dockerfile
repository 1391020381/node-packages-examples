FROM node:10-alpine

ENV PROJECT_ENV production

ENV NODE_ENV production
WORKDIR  /code
ADD .  /code
RUN npm install  && npm run build && npm install -g http-server
EXPOSE 80