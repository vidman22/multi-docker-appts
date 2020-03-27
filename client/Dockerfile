FROM node:alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build 

FROM node:alpine 
WORKDIR /app
COPY --from=builder /app/build /app/build
RUN npm install -g serve
CMD serve -d -s build -l 3000