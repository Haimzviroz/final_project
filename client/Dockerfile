# שלב 1: בניית הפרויקט
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# הזרקת VITE_BASEURL בזמן הבנייה
ARG VITE_BASEURL
ENV VITE_BASEURL=${VITE_BASEURL}
RUN echo "Building with VITE_BASEURL=${VITE_BASEURL}"

# הרצת הבילד של Vite
RUN npm run build

# שלב 2: הפעלת הפרויקט ב-Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
