# frontend
FROM node:18-alpine as frontend-build

WORKDIR /frontend

COPY frontend/ ./

RUN yarn install

RUN yarn build

# # backend
FROM node:18-alpine as backend

WORKDIR /ridgewood

COPY backend/ ./

RUN yarn install

COPY --from=frontend-build /frontend/build ./frontend-build

EXPOSE 8080

CMD [ "node", "index.js" ]