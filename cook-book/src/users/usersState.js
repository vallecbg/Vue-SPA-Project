import { http } from '../shared/services/httpClient';

const initialState = {
    user: {
        _id: null
    },
    userRecipes: [],
    userArticles: []
};

const actionTypes = {
    getUser: '[USER] GET SINGLE USER SUCCESS',
    getUserRecipes: '[RECIPE] GET USER RECIPES SUCCESS',
    getUserArticles: '[RECIPE] GET USER ARTICLES SUCCESS'
};

export const { getUser, getUserRecipes, getUserArticles } = actionTypes;

const getters = {
    user: state => state.user,
    userRecipes: state => state.userRecipes,
    userArticles: state => state.userArticles
};

const actions = {
    async [getUser]({ commit }, payload) {
        const { id } = payload;
        await http
            .get(`/?query={"_id":"${id}"}`, {
                getUser: true
            })
            .then(user => {
                console.log(user);
                const data = Object.assign(user.data[0]);
                commit(getUser, data);
            });
    },
    async [getUserRecipes]({ commit }, payload) {
        const { id } = payload;
        const { data } = await http.get(`recipes/?query={"creator":"${id}"}`);
        Promise.all(data).then(data => {
            commit(actionTypes.getUserRecipes, data);
        });
    },
    async [getUserArticles]({ commit }, payload) {
        const { id } = payload;
        const { data } = await http.get(`articles/?query={"creator":"${id}"}`);
        Promise.all(data).then(data => {
            commit(actionTypes.getUserArticles, data);
        });
    }
};

const mutations = {
    [getUser](state, payload) {
        Object.assign(state, { user: payload });
    },
    [getUserRecipes](state, payload) {
        Object.assign(state, { userRecipes: payload });
    },
    [getUserArticles](state, payload) {
        Object.assign(state, { userArticles: payload });
    }
};

export default {
    getters,
    mutations,
    actions,
    state: initialState
};
