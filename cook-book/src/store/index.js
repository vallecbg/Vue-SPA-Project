import Vue from 'vue';
import Vuex from 'vuex';
import authState from '../auth/authState';
import recipesState from '../recipes/recipesState'
import usersState from '../users/usersState'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        authState,
        recipesState,
        usersState
    }
});
