import http from './httpService'
import config from '../config.json';

export function getGenres() {
    return http.get(config.api_url + '/genres')
};