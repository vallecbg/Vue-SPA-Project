import {http} from '../shared/services/httpClient'

const initialState = {
    user: {
        _id: null
    }
}

const actionTypes = {
    getUser: '[USER] GET SINGLE USER SUCCESS',
}

export const {
    getUser
} = actionTypes;

const getters = {
    user: state => state.user,
}

const actions = {

    async [getUser]({commit}, payload) {
        const {id} = payload;
        const user = await http.get(`/?query={"_id":"${id}"}`, { getUser: true});
        const data = Object.assign(user.data[0]);
        commit(getUser, data)
    },
}

const mutations = {
    [getUser](state, payload) {
        Object.assign(state, {user: payload});
    },
}

export default {
    getters,
    mutations,
    actions,
    state: initialState
}