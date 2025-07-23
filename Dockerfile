FROM node20
WORKDIR /websocket-broadcast-relay
COPY package.json yarn.lock .
RUN yarn install --prod
COPY . .
EXPOSE 3333
CMD ["yarn", "prod"]
