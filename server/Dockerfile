FROM node:8.13.0 AS build

WORKDIR /home/node
ENV NODE_ENV=development
ENV MONGOMS_DISABLE_POSTINSTALL=1

COPY package.json babel.config.js /home/node/
RUN npm install

COPY .env.example .env /home/node/
COPY src /home/node/src
COPY test /home/node/test
RUN CI=true npm test

RUN npm run build

CMD ["npm", "run", "dev"]

#########################################################

FROM node:8.13.0

WORKDIR /home/node
ENV NODE_ENV=production

COPY --from=build /home/node/build/ /home/node/build/
COPY --from=build /home/node/package*.json /home/node/
RUN npm install

CMD ["node", "build/app.js"]
