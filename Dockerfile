FROM node:19-alpine AS build-step
WORKDIR /app

COPY front-end/package.json ./package.json
COPY front-end/public ./public
COPY front-end/src ./src
RUN npm install
RUN npm run build

# Build the API with the client as static files
FROM python:3.10
WORKDIR /app

COPY --from=build-step /app/build ./build

COPY back-end/data ./api/data/
COPY back-end/requirements.txt back-end/server.py ./api/
RUN pip install -r ./api/requirements.txt

EXPOSE 5000
WORKDIR /app/api
CMD ["sh", "-c", "gunicorn -b 0.0.0.0:${PORT:-5000} server:app"]
