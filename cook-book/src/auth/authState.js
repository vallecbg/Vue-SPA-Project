import { http } from '../shared/services/httpClient';
import { toastSuccess, toastError } from '../shared/services/notifications';
import router from '../router/index';

const initialState = {
    isAuth: localStorage.getItem('authtoken') !== null,
    authtoken: localStorage.getItem('authtoken'),
    userInfo: null
};

export const actionTypes = {
    loginSuccess: '[AUTH] LOGIN SUCCESS',
    registerSuccess: '[AUTH] REGISTER SUCCESS',
    logoutSuccess: '[AUTH] LOGOUT SUCCESS'
};

export const { loginSuccess, logoutSuccess, registerSuccess } = actionTypes;

const getters = {
    authtoken: state => state.authtoken,
    isAuth: state => state.isAuth
};

const actions = {
    async [loginSuccess]({ commit }, payload) {
        try {
            const { username, password } = payload;
            const { data } = await http.post('login', { username, password });
            localStorage.setItem('authtoken', data._kmd.authtoken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data._id);
            toastSuccess('Successfully logged in!');
            commit(loginSuccess, {
                userInfo: data,
                authtoken: data._kmd.authtoken,
                isAuth: true
            });
            router.push('/', () => {});
        } catch (err) {
            toastError(`Something went wrong - ${err}`);
        }
    },
    async [logoutSuccess]({ commit }) {
        localStorage.clear();
        toastSuccess('Successfully logged out!');
        commit(logoutSuccess);
    },
    async [registerSuccess]({ commit }, payload) {
        try {
            await http.post('', payload);
            toastSuccess('Successfully registered!');
            commit(registerSuccess);
            router.push('/login', () => {});
        } catch (err) {
            toastError(`Something went wrong - ${err}`);
        }
    }
};

const mutations = {
    [loginSuccess](state, payload) {
        Object.assign(state, payload);
    },
    [logoutSuccess](state) {
        Object.assign(state, {
            isAuth: false,
            authtoken: null,
            userInfo: null
        });
    },
    [registerSuccess](state) {
        Object.assign(state);
    }
};

export default {
    state: initialState,
    getters,
    actions,
    mutations
};
