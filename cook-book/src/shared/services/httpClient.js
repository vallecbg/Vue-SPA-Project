import axios from 'axios';
import {
    cacheAdapterEnhancer
} from 'axios-extensions';
import {
    toastError
} from './notifications.js'

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_B1yjlJ1IU';
const appSecret = '1be84f7360394d6cbd6129dd9c6d5ec7';

const cacheConfig = {
    enabledByDefault: false,
    cacheFlag: 'useCache'
};

const config = {
    baseURL: baseUrl,
    headers: {
        'Cache-Control': 'no-cache'
    },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig)
};

const http = axios.create(config);

const authInterceptor = function (config) {
    if (
        (config.url === 'login' || config.url === '') &&
        config.method === 'post'
    ) {
        config.baseURL = `${baseUrl}/user/${appKey}`;
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`)
        };
    } else if (
        config.url[0] === '/' &&
        config.method === 'get' &&
        config.getUser === true
    ) {
        const token = localStorage.getItem('authtoken');
        config.baseURL = `${baseUrl}/user/${appKey}`;
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: 'Kinvey ' + token
        };
    } else {
        const token = localStorage.getItem('authtoken');
        config.baseURL = `${baseUrl}/appdata/${appKey}`;
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: 'Kinvey ' + token
        };
    }
    return config;
};

const loggerInterceptor = config => {
    return config;
};

// Adding the request interceptors
http.interceptors.request.use(authInterceptor);
http.interceptors.request.use(loggerInterceptor);

// Adding the response interceptors
const errorInterceptor = function (error) {
    if (error.response.status === 401) {
        toastError(
            `${error.response.statusText}: ${error.response.data.description}`
        );
    } else if (error.response.status === 500) {
        toastError(`${error.response.statusText}: Server Error`);
    }

    return Promise.reject(error);
};

const responseInterceptor = function (response) {
    return response;
};

http.interceptors.response.use(responseInterceptor, errorInterceptor);

export {
    http
};