FROM node:6.6.0

RUN npm i -g webpack
ADD package.json /tmp/package.json
RUN cd /tmp && npm i
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app
COPY . /usr/src/app

CMD ["npm", "start"]
EXPOSE 8080