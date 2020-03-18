import axios from 'axios';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_B1yjlJ1IU';
const appSecret = '1be84f7360394d6cbd6129dd9c6d5ec7';

const config = {
    baseURL: baseUrl
};

const http = axios.create(config);

/**
 * Auth interceptors
 * @description Configuration related to AUTH token can be done in interceptors.
 * Currenlty it is just doing nothing but idea to to show the capability of axios and its interceptors
 * In future, interceptors can be created into separate files and consumed into multiple http clients
 * @param {*} config
 */
const authInterceptor = config => {
    if ((config.url === "login" ||
        config.url === "") &&
        config.method === "post") {
        config.baseURL = `${baseUrl}/user/${appKey}`;
        config.headers = { 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`) }
    } else {
        const token = localStorage.getItem("authtoken");
        config.baseURL = `${baseUrl}/appdata/${appKey}`;
        config.headers = { 'Content-Type': 'application/json', Authorization: 'Kinvey ' + token }
    }
    return config;
};

const loggerInterceptor = config => {
    /** Add logging here */
    return config;
};

/** Adding the request interceptors */
http.interceptors.request.use(authInterceptor);
http.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export { http } 