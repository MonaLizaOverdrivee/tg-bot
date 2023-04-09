FROM node:18-alpine as build
ENV NODE_ENV="production"
WORKDIR /app
COPY ./src ./src
COPY ./package*.json ./tsconfig.json ./main.ts ./
RUN npm install
RUN npm run build
WORKDIR /app/dist
EXPOSE 80
#CMD ["node", "--experimental-specifier-resolution=node", "main.js"]
#CMD ["ls", "-l"]

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist .
CMD ["ls", "-l"]
