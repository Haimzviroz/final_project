FROM node:18-alpine
# הגדרת תיקיית העבודה
WORKDIR /app
# package-lock.json-ו package.json קבצי העתקת 
COPY package*.json ./
# התקנת dependencies
RUN npm install
# העתקת כל שאר הקבצים
COPY . .
ARG MONGO_URI
ENV MONGO_URI=${MONGO_URI}
# קומפילציה של TypeScript לJavaScript
RUN npm run build
# חשיפת פורט 4000 או כל פורט אחר שהאפליקציה משתמשת בו
EXPOSE 3000
# הרצת האפליקציה
CMD ["npm", "run", "start"]