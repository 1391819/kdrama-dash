<div align="center">
  <img src="utils/logo-light-nobg.png" alt="logo" width="128"/>
  <h1>KDrama Dash - V1</h1>

[kdrama-dash.herokuapp.com](https://kdrama-dash.herokuapp.com/)

</div>

<div align="justify">

## About

A web application to discover and search for Korean TV series. Built using React and Flask. All the data was taken from TMDB's API and pre-processed initially on Kaggle's notebooks. 

During its development, additional resources were created: a public [Kaggle dataset](https://www.kaggle.com/datasets/robertonacu/tmdb-kdramas-2022) and various scripts used to pre-process the data from TMDB's API (i.e., improved usability in case we'd want to transfer the local data to a cloud database).

## Features
- Search and go through various details regarding 1400+ Korean TV series
- Series filtering based on genre, popularity, TMDB rating and release date
- Recommendation system using an item-based collaborative filtering approach
- Desktop/tablet/mobile responsiveness

## Stack

- React, Flask and SCSS
- API, Sklearn and Data Analysis
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

## Roadmap

- [x] TMDB API data analysis using Notebooks (Kaggle)
- [x] Scripts to obtain main application data (API, data pre-processing)
- [x] Public Kaggle dataset creation
- [x] Item-based collaborative filtering (recommendation system)
- [x] Flask server development 
- [x] Front-end development - homepage, series catalogue, trending, etc...
- [x] Desktop/Tablet/Mobile responsiveness
- [x] Docker image of the application and deployment on Heroku
- [ ] Safari/Firefox compatibility
- [ ] Automatic scheduling of data extraction from API scripts
- [ ] Future features  
  - [ ] Sign up and sign in feature
  - [ ] Transfer main application data from .csv files to databases
  - [ ] Build watch-list feature
  - [ ] User-based collaborative filtering (or content-based)
  - [ ] Light and dark mode
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
