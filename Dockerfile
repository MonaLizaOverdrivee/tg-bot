FROM node:18-alpine as build
WORKDIR /app
COPY ./src ./src
COPY ./package*.json ./tsconfig.json ./main.ts ./
RUN npm install
RUN npm run build

FROM node:18-alpine
ARG BOT_TOKEN
ENV NODE_ENV="production"
ENV TOKEN=$BOT_TOKEN
WORKDIR /app
COPY --from=build /app/dist .
COPY package*.json ./
RUN npm ci --omit=dev
EXPOSE 80
#CMD ["ls", "-l"]
CMD ["node", "--experimental-specifier-resolution=node", "main.js"]
