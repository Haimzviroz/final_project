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

# שלב 2: הפעלת הפרויקט
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production

# הפעלת השרת
EXPOSE 80
CMD ["npm", "preview"]
