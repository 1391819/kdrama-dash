<div align="center">
  <img src="utils/logo-light-nobg.png" alt="logo" width="128"/>
  <h1>KDrama Dash</h1>

</div>

<div align="justify">

## About

## Stack

- React
- SCSS
- Flask
- API and EDA
- Content-based Filtering

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

- [x] TMDB API EDA using Notebooks (Kaggle)
- [x] Creation of scripts to obtain main application data (API, data pre-processing)
- [x] Public [Kaggle dataset](https://www.kaggle.com/datasets/robertonacu/tmdb-kdramas-2022) creation
- [x] Content-based Filtering (series recommendation feature)
- [x] Flask app development 
- [x] Front-end structure - homepage, series catalogue, trending, etc...
- [x] Desktop/Tablet/Mobile responsiveness
- [ ] Safari/Firefox compatibility
- [ ] Future features  
  - [ ] Sign up and sign in feature
  - [ ] Transfer main application data from .csv files to databases
  - [ ] Build watch-list feature
  - [ ] Light and dark mode
## Highlights

<div align="center">
  <img src="utils/landpage.gif" alt="landpage gif"/>
</div>

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- flask
  ```py
  pip install flask
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/1391819/kdrama-dash
   ```
2. Install NPM packages
   ```sh
   cd front-end
   npm install
   ```
3. Start Flask server
   ```sh
   cd back-end
   python server.py
   ```
4. Start front-end
   ```sh
   cd front-end
   npm start
   ```

## Attributions

<a href="https://www.themoviedb.org/" title="TMDB">The Movie Database</a>

## License

[MIT](https://github.com/1391819/kdrama-dash/blob/main/License.txt) © [Roberto Nacu](https://github.com/1391819)

</div>
