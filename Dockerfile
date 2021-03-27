FROM node:12-alpine
WORKDIR /app
COPY . .
# RUN npm install --no-package-lock
RUN ls ./node_modules
EXPOSE 3000
CMD ["npm","run","start:dev"]