FROM node:18-alpine as build
WORKDIR /app
COPY ./src ./src
COPY ./package*.json ./tsconfig.json ./main.ts ./
RUN npm install
RUN npm run build
#CMD ["node", "--experimental-specifier-resolution=node", "main.js"]
#CMD ["ls", "-l"]

FROM node:18-alpine
ENV NODE_ENV="production"
WORKDIR /app
COPY --from=build /app/dist .
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 80
CMD ["ls", "-l"]
