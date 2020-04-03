import { http } from '../shared/services/httpClient';
import { toastSuccess } from '../shared/services/notifications';

const initialState = {
    allRecipes: [],
    recipe: {
        _id: null
    }
};

const actionTypes = {
    getRecipes: '[RECIPE] GET ALL RECIPES SUCCESS',
    //getHomeRecipes: '[RECIPE] GET 3 RECIPES SUCCESS',
    getRecipe: '[RECIPE] GET SINGLE RECIPE SUCCESS',
    createRecipe: '[RECIPE] CREATE NEW RECIPE SUCCESS',
    editRecipe: '[RECIPE] EDIT SINGLE RECIPE SUCCESS',
    deleteRecipe: '[RECIPE] DELETE RECIPE SUCCESS'
};

export const {
    getRecipes,
    getRecipe,
    createRecipe,
    editRecipe,
    deleteRecipe
} = actionTypes;

const getters = {
    allRecipes: state => state.allRecipes,
    recipe: state => state.recipe
};

const actions = {
    async [getRecipes]({ commit }) {
        const { data } = await http.get('recipes');
        Promise.all(data).then(data => {
            commit(actionTypes.getRecipes, data);
        });
    },

    async [getRecipe]({ commit }, payload) {
        const { id } = payload;
        const recipe = await http.get(`recipes/?query={"_id":"${id}"}`);
        const data = Object.assign(recipe.data[0]);
        commit(getRecipe, data);
    },

    async [createRecipe]({ commit }, payload) {
        const recipe = Object.assign(payload);
        const { data } = await http.post('recipes', recipe);
        toastSuccess('Successfully created recipe!');
        commit(createRecipe, { recipe: data });
    },

    async [editRecipe](_, payload) {
        const recipe = Object.assign(payload);
        await http.put(`recipes/${recipe._id}`, recipe);
        toastSuccess('Successfully edited recipe!');
    },

    async [deleteRecipe]({ commit }, payload) {
        const { id } = payload;
        await http.delete(`recipes/${id}`);
        toastSuccess('Successfully deleted recipe!');
        commit(deleteRecipe, id);
    }
};

const mutations = {
    [getRecipes](state, payload) {
        Object.assign(state, { allRecipes: payload });
    },
    [getRecipe](state, payload) {
        Object.assign(state, { recipe: payload });
    },
    [createRecipe](state, payload) {
        const { recipe } = payload;
        const list = state.allRecipes.concat(recipe);
        Object.assign(state, { allRecipes: list });
    },
    [deleteRecipe](state, payload) {
        const list = state.allRecipes.filter(r => r._id !== payload);
        Object.assign(state, { allRecipes: list });
    }
};

export default {
    getters,
    mutations,
    actions,
    state: initialState
};
