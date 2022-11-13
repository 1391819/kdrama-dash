FROM node:19-alpine as build-step
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY front-end/package.json front-end/static.json ./
COPY front-end/public/ ./public
COPY front-end/src/ ./src
RUN npm install
RUN npm run build

# Build the API with the client as static files
FROM python:3.10
WORKDIR /app
COPY --from=build-step /app/build ./build

RUN mkdir ./api
COPY back-end/data/genres.csv back-end/data/series_ready_w_tags.csv ./api/data/
COPY back-end/requirements.txt back-end/server.py back-end/.flaskenv ./api/
RUN pip install -r ./api/requirements.txt
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0

#EXPOSE 3000
WORKDIR /app/api/
#CMD ["gunicorn", "-b", ":3000", "server:app"]
CMD ["gunicorn", "server:app"]