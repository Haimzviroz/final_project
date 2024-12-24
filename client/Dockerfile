# שלב 1: בניית הפרויקט
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@11.0.0 && npm install --include=dev
COPY . .
ARG VITE_BASEURL
ENV VITE_BASEURL=${VITE_BASEURL}
RUN npm run build

# שלב 2: הרצה
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production
EXPOSE 80
CMD ["npx", "serve", "-s", "dist"]
