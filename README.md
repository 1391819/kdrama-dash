<div align="center">
  <img src="utils/logo-light-nobg.png" alt="logo" width="128"/>
  <h1>KDrama Dash - V1</h1>

</div>

<div align="justify">

A web application to discover and search for Korean TV series. Built using React and Flask. All the data was taken from TMDB's API and pre-processed initially on Kaggle's notebooks. 

During its development, additional publicly shared resources were created: a Kaggle [dataset](https://www.kaggle.com/datasets/robertonacu/tmdb-kdramas-2022), and a relatively simple [example](https://www.kaggle.com/code/robertonacu/kdrama-recommender) regarding how to use the provided dataset to create a recommendation system.

## Roadmap

## Roadmap

- [x]  Research and gather data from TMDB’s API for Korean TV series
- [x]  Pre-process the gathered data using Kaggle’s notebooks
- [x]  Create a public Kaggle dataset
- [x]  Perform exploratory data analysis (EDA) on the new dataset
- [x]  Build the web application’s front-end
- [x]  Ensure desktop/tablet/mobile responsiveness
- [x]  Build back-end using Flask, ensuring efficient and optimised response times
- [x]  Provide series filtering based on genre, popularity, TMDB rating and release date
- [x]  Develop an item-based collaborative filtering recommendation system using cosine similarity
- [x]  Containerise the application using Docker for easy deployment
- [x]  Deploy the web application on Heroku
- [x]  Test the performance of the application
- [x]  Improve the user interface and the overall user experience
- [x]  Conduct thorough testing to ensure functionality and stability
- [ ]  Ensure Safari/Firefox compatibility
- [ ]  Automatic scheduling of data extraction from custom Python scripts (API “handlers”)
- [ ]  Sign-up and sign-in features
- [ ]  Convert whole application from .csv based to database based
- [ ]  Build watch-list feature
- [ ]  User-based collaborative filtering (or content-based)
- [ ]  Light and dark options

## Stack

- React, Flask and SCSS
- API, Sklearn and EDA
- Item-based collaborative filtering (cosine similarity)
- Docker + Heroku

## Project structure

```
$PROJECT_ROOT
│   # GitHub repo utilities
├── utils
│   # Front end of the application
├─┬ front-end
│ │   # Static files
│ ├── public
│ │   # Main front-end files
│ └─┬ src
│   │   # Page files
│   ├── pages
│   │   # Styling files
│   ├── scss
│   │   # React component files
│   ├── components
│   │   # Routing configuration
│   ├── config
│   │   # Static assets
│   └── assets
│   # Back end of the application
└─┬ back-end
  │   # Data used to build the application
  ├── data
  │   # Flask server
  └── server.py
```
  
## Highlights

<div align="center">
  <img src="utils/landpage.gif" alt="landpage gif"/>
</div>

## Getting Started

### Development

1. Clone the repo
   ```sh
   git clone https://github.com/1391819/kdrama-dash
   ```
2. Install all the required libraries
   ```sh
   cd back-end
   pip install -r requirements.txt
   ```
3. Start Flask server
   ```sh
   python server.py
   ```
4. Install NPM packages
   ```sh
   cd ../front-end
   npm install
   ```
5. Modify the package.json file and add the proxy to the flask server's local port
   > "proxy": "http://localhost:5000/"
6. Start the project
   ```sh
   cd front-end
   npm start
   ```
7. Go to the local site 
   > [http://localhost:3000/](http://localhost:3000/)

## Attributions

<a href="https://www.themoviedb.org/" title="TMDB">The Movie Database</a>

## License

[MIT](https://github.com/1391819/kdrama-dash/blob/main/License.txt) © [Roberto Nacu](https://github.com/1391819)

</div>
