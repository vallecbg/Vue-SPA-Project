//TODO: add toastr notifications
import { http } from '../shared/services/httpClient';

const initialState = {
  isAuth: localStorage.getItem('authtoken') !== null,
  authtoken: localStorage.getItem('authtoken'),
  userInfo: null,
  user: null
};

export const actionTypes = {
  loginSuccess: '[AUTH] LOGIN SUCCESS',
  registerSuccess: '[AUTH] REGISTER SUCCESS',
  logoutSuccess: '[AUTH] LOGOUT SUCCESS',
  getUser: '[USER] GET SINGLE USER SUCCESS'
};

export const { 
  loginSuccess, 
  logoutSuccess, 
  registerSuccess,
  getUser
} = actionTypes;

const getters = {
  authtoken: state => state.authtoken,
  isAuth: state => state.isAuth,
  user: state => state.user
};

const actions = {
  async [loginSuccess]({ commit }, payload) {
    const { username, password } = payload;
    const { data } = await http.post('login', { username, password });
    localStorage.setItem('authtoken', data._kmd.authtoken);
    localStorage.setItem('username', data.username);
    localStorage.setItem('userId', data._id);
    commit(loginSuccess, {
      userInfo: data,
      authtoken: data._kmd.authtoken,
      isAuth: true
    });
  },
  async [logoutSuccess]({ commit }) {
    localStorage.clear();
    commit(logoutSuccess);
  },
  async [registerSuccess]({ commit }, payload) {
    await http.post('', payload);
    commit(registerSuccess);
  },
  async [getUser]({commit}, payload){
    const {userId} = payload;
    const user = await http.get(`/?query={"_id":"${userId}"}`);
    commit(getUser, user);
  }
};

const mutations = {
  [loginSuccess](state, payload) {
    Object.assign(state, payload);
  },
  [logoutSuccess](state) {
    Object.assign(state, { isAuth: false, authtoken: null, userInfo: null });
  },
  [registerSuccess](state) {
    Object.assign(state);
  },
  [getUser](state){
    Object.assign(state);
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};