# Stage 1 - dev
FROM node:8.13.0 as dev
WORKDIR /home/node
COPY package*.json /home/node
RUN npm install
COPY public /home/node/public
COPY src /home/node/src
CMD ["npm", "start"]

# Stage 2 - build
FROM node:8.13.0 as build
WORKDIR /home/node
COPY package*.json /home/node
RUN npm install
COPY public /home/node/public
COPY src /home/node/src
# same as stage 1 to here, therefore reuses cached layers
# this means we dont need to wait for tests and build in dev mode
RUN CI=true npm test
ARG API_URL
RUN REACT_APP_API_URL=$API_URL npm run build

# Stage 3, serve built app with nginx
FROM nginx:1.15
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/build/ /usr/share/nginx/html
