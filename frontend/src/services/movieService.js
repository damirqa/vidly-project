import http from "./httpService";
import config from "../config.json"

const movieLink = config.api_url + '/movies';

function movieUrl(id) {
    return `${movieLink}/${id}`;
}

export function getMovies() {
    return http.get(movieLink);
}

export function getMovie(movieId) {
    return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = {...movie};
        delete body._id;

        return http.put(movieUrl(movie._id), body);
    }

    return http.post(movieLink, movie);
}

export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
}