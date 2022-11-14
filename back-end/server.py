# Importing dependencies
import json
from datetime import date

import pandas as pd
from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
# https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html
from sklearn.feature_extraction.text import CountVectorizer
# https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html
from sklearn.metrics.pairwise import cosine_similarity

# Init Flask app
app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)


def get_series_df():
    """ Return all series

    Returns:
        pd.DataFrame: DataFrame containing all the series
    """
    # Data available for each series

    # tmdb_id, name, original_name, keywords, airing_date, poster_img_url, background_img_url, directors, cast,
    # genres, number_of_seasons, number_of_episodes, episode_runtime, synopsis, popularity, average_rating,
    # rating_count,  next_episode_to_air, next_episode_air_date, origin_country, networks, production_companies
    df = pd.read_csv("data/series_ready_w_tags.csv")

    return df


def create_similarity():
    """ Get series data and similarity matrix created using cosine_similarity

    Returns:
        pd.DataFrame: Series data
        array: Similarity matrix
    """
    series = get_series_df()

    # Taking only series that have a tags value (used for the recommender system)
    series = series[series["tags"].notnull()]

    # Resetting indeces
    series = series.reset_index(drop=True)

    # Creating vectorizer
    cv = CountVectorizer(max_features=5000, stop_words="english")
    vectors = cv.fit_transform(series["tags"]).toarray()

    # Creating the similarity matrix
    similarity = cosine_similarity(vectors)

    return series, similarity


@app.route("/api/trending", methods=["GET"])
@cross_origin()
def get_trending():
    """ Get 16 trending series (highest average rating)

    Returns:
        JSON: Object containing series data
    """
    # Getting all series
    series = get_series_df()

    # Calculating real rating
    real_rating = series["average_rating"] / series["rating_count"]
    series["real_rating"] = real_rating

    # Sort by real rating, and grab fist 16 series
    series = series.sort_values(by="real_rating", ascending=True)[0:10]

    # Converting df to json
    data = series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/popular", methods=["GET"])
@cross_origin()
def get_popular_series():
    """ Get popular series

    Returns:
        JSON: Object containing popular series data
    """
    # Getting all series
    series = get_series_df()

    # Sorting by popularity, and grab first 14 series
    popular_series = series.sort_values(by="popularity", ascending=False)[0:14]

    # Converting df to json
    data = popular_series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/banner", methods=["GET"])
@cross_origin()
def get_banner_series():
    """ Get four series with the highest average rating (for hero slide on home page)

    Returns:
        JSON: Object containing series data
    """
    # Getting all series
    series = get_series_df()

    # Grab series that have a background_img_url
    series = series[series["background_img_url"].notnull()]

    # Calculating real rating
    real_rating = series["average_rating"] / series["rating_count"]
    series["real_rating"] = real_rating

    # Sort by real rating, and grab fist 16 series
    series = series.sort_values(by="real_rating", ascending=True)[0:16]

    # Grab four random series
    series = series.sample(5)

    # Converting df to json
    data = series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/random", methods=["GET"])
@cross_origin()
def get_random_series():
    """ Retrieve one random series

    Returns:
        JSON: Object containing randomised series data
    """
    # Getting all series
    series = get_series_df()

    # Sampling one random series from the dataframe
    random_series = series.sample()

    # Converting df to json
    data = random_series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/series/<int:id>", methods=["GET"])
@cross_origin()
def get_series_by_id(id):
    """ Retrieve series data by id

    Args:
        id (int): tmdb_id of the series

    Returns:
        JSON: Object containing series data
    """

    # Getting all series
    series = get_series_df()

    series_data = series[series["tmdb_id"] == int(id)]

    # Converting df to json
    data = series_data.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/similarity/<int:id>", methods=["GET"])
@cross_origin()
def get_similarity(id):
    """ Get series similar (cosine similarity) to the selected one

    Args:
        id (int): tmdb_id of the series

    Returns:
        JSON: Object containing similar series
    """
    series, similarity = create_similarity()

    # If series tmdb_id is in the pre processed series df (i.e., if it has a tags column)
    if id in series["tmdb_id"].values:

        # Grab id of the selected series
        series_index = series[series["tmdb_id"] == id].index[0]

        # Calculate similarity
        distances = similarity[series_index]

        # Get top 4 similar series according to their cosine similarity
        # Sort the similarities and grab the first 10 values
        series_list = sorted(list(enumerate(distances)),
                             reverse=True, key=lambda x: x[1])[1:5]

        # Grabbing data of similar series / series_list -> (index, similarity)
        series_indexes = [serie[0] for serie in series_list]
        series = series.iloc[series_indexes]

    else:
        return []

    # Converting df to json
    data = series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/series/<string:category>", methods=["GET"])
@cross_origin()
def get_series_by_category(category):
    """ Retrieve all series associated with a particular genre

    Returns:
        JSON: Object containing series data
    """
    # Getting all series
    series = get_series_df()

    # Go thorugh each value in the genres column
    # (instead of creating a new df, we drop the rows which aren't associated with the selected category)
    for index, value in series["genres"].iteritems():

        # Checking if it's empty or not before processing data
        if not pd.isna(value):
            values = value.split(", ")

            # if selected genre isn't associated with a particular series, drop row
            if category not in values:
                series.drop([index], inplace=True)
        # if no genres, drop row
        else:
            series.drop([index], inplace=True)

    # Sorting by popularity
    series = series.sort_values(by="popularity", ascending=False)

    # Converting df to json
    data = series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/genres", methods=["GET"])
@cross_origin()
def get_all_genres():
    """ Get all the genres

    Returns:
        JSON: Object containing all the available genres across all series
    """

    # Loading genres file
    genres_df = pd.read_csv("data/genres.csv")

    # Sorting in alphabetical order
    genres_df = genres_df.sort_values(by="name", ascending=True)

    # Converting df to json
    data = genres_df.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/upcoming", methods=["GET"])
@cross_origin()
def get_upcoming_series():
    """ Get upcoming series

    Returns:
        JSON: Object containing upcoming series data
    """
    # Getting all series
    series = get_series_df()

    # Sorting by airing date (reversed)
    upcoming_series = series.sort_values(by="airing_date", ascending=True)

    # Filtering dates which are older than today, and grabbing first 14 series
    upcoming_series = upcoming_series[(
        upcoming_series["airing_date"] > str(date.today()))][0:14]

    # Converting df to json
    data = upcoming_series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/newest", methods=["GET"])
@cross_origin()
def get_newest_series():
    """ Get 14 top newest series

    Returns:
        JSON: Object containing 14 newest series data
    """
    # Getting all series
    series = get_series_df()

    # Sorting by airing date
    newest_series = series.sort_values(by="airing_date", ascending=False)

    # Filtering dates which are older than today, and grabbing the first 14 values
    newest_series = newest_series[(
        newest_series["airing_date"] < str(date.today()))][0:14]

    # Converting df to json
    data = newest_series.to_json(orient="records")

    # Creating JSON object from JSON string
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/api/series", methods=["GET"])
@cross_origin()
def get_all_series():
    """ Get all series

    Returns:
        JSON: Object containing all the available series data
    """
    series = get_series_df()

    # all_data = series.to_dict()
    # return jsonify(all_data)

    data = series.to_json(orient="records")
    json_data = json.loads(data)

    # return all_data
    return json_data


@app.route("/", methods=["GET"])
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'index.html')  # type: ignore


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')  # type: ignore


# Running app
if __name__ == "__main__":
    app.run(debug=False)
