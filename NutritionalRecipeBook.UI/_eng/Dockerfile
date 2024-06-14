FROM node:21-alpine
EXPOSE 3000
WORKDIR /app
COPY . .

RUN npm install -g serve
RUN npm ci
RUN npm run build
CMD ["serve", "-n", "-s", "build"]