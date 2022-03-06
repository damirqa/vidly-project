import http from "./httpService";
import config from "../config.json"

const userUrl = config.api_url + '/users';

export function register(user) {
    return http.post(userUrl, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}