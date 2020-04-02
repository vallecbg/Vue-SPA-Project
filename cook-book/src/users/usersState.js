import { http } from '../shared/services/httpClient';

const initialState = {
    user: {
        _id: null
    },
    userRecipes: [],
};

const actionTypes = {
    getUser: '[USER] GET SINGLE USER SUCCESS',
    getUserRecipes: '[RECIPE] GET USER RECIPES SUCCESS'
};

export const { getUser, getUserRecipes } = actionTypes;

const getters = {
    user: state => state.user,
    userRecipes: state => state.userRecipes
};

const actions = {
    async [getUser]({ commit }, payload) {
        const { id } = payload;
        if (id){
            await http.get(`/?query={"_id":"${id}"}`, {
                getUser: true
            }).then(user => {
                console.log(user);
                const data = Object.assign(user.data[0]);
                commit(getUser, data);
            });
        }
    },
    async [getUserRecipes]({ commit }, payload) {
        const { id } = payload;
        const { data } = await http.get(`recipes/?query={"creator":"${id}"}`);
        Promise.all(data).then(data => {
            commit(actionTypes.getUserRecipes, data);
        });
    },
};

const mutations = {
    [getUser](state, payload) {
        Object.assign(state, { user: payload });
        //console.clear();
    },
    [getUserRecipes](state, payload) {
        Object.assign(state, { userRecipes: payload });
    },
};

export default {
    getters,
    mutations,
    actions,
    state: initialState
};
