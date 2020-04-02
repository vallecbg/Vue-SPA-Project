import { http } from '../shared/services/httpClient';
import { toastSuccess } from '../shared/services/notifications';

const initialState = {
    allArticles: [],
    article: {
        _id: null
    }
};

const actionTypes = {
    getArticles: '[ARTICLE] GET ALL ARTICLES SUCCESS',
    getArticle: '[ARTICLE] GET SINGLE ARTICLE SUCCESS',
    createArticle: '[ARTICLE] CREATE NEW ARTICLE SUCCESS',
    editArticle: '[ARTICLE] EDIT SINGLE ARTICLE SUCCESS',
    deleteArticle: '[ARTICLE] DELETE ARTICLE SUCCESS'
};

export const {
    getArticles,
    getArticle,
    createArticle,
    editArticle,
    deleteArticle
} = actionTypes;

const getters = {
    allArticles: state => state.allArticles,
    article: state => state.article
};

const actions = {
    async [getArticles]({ commit }) {
        const { data } = await http.get('articles');
        Promise.all(data).then(data => {
            commit(actionTypes.getArticles, data);
        });
    },

    async [getArticle]({ commit }, payload) {
        const { id } = payload;
        const article = await http.get(`articles/?query={"_id":"${id}"}`);
        const data = Object.assign(article.data[0]);
        commit(getArticle, data);
    },

    async [createArticle]({ commit }, payload) {
        const article = Object.assign(payload);
        const { data } = await http.post('articles', article);
        toastSuccess('Successfully created article!');
        commit(createArticle, { article: data });
    },

    async [editArticle](_, payload) {
        const article = Object.assign(payload);
        await http.put(`articles/${article._id}`, article);
        toastSuccess('Successfully edited article!');
    },

    async [deleteArticle]({ commit }, payload) {
        const { id } = payload;
        await http.delete(`articles/${id}`);
        toastSuccess('Successfully deleted article!');
        commit(deleteArticle, id);
    }
};

const mutations = {
    [getArticles](state, payload) {
        Object.assign(state, { allArticles: payload });
    },
    [getArticle](state, payload) {
        Object.assign(state, { article: payload });
    },
    [createArticle](state, payload) {
        const { article } = payload;
        const list = state.allArticles.concat(article);
        Object.assign(state, { allArticles: list });
    },
    [deleteArticle](state, payload) {
        const list = state.allArticles.filter(r => r._id !== payload);
        Object.assign(state, { allArticles: list });
    }
};

export default {
    getters,
    mutations,
    actions,
    state: initialState
};
