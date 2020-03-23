import {http} from '../shared/services/httpClient'

const initialState = {
    allRecipes: [],
    recipe: {
        _id: null
    }
}

const actionTypes = {
    getRecipes: '[RECIPE] GET ALL RECIPES SUCCESS',
    getRecipe: '[RECIPE] GET SINGLE RECIPE SUCCESS',
    //deleteRecipe: '[RECIPE] DELETE RECIPE SUCCESS',
    //createRecipe: '[RECIPE] CREATE NEW RECIPE SUCCESS',
}

export const {
    getRecipes,
    getRecipe
} = actionTypes;

const getters = {
    allRecipes: state => state.allRecipes,
    recipe: state => state.recipe
}

const actions = {
    async [getRecipes]({commit}) {
        const { data } = await http.get('recipes');
        Promise.all(data).then(data => {
            commit(actionTypes.getRecipes, data)
        });
    },

    async [getRecipe]({commit}, payload) {
        const {id} = payload;
        const recipe = await http.get(`recipes/?query={"_id":"${id}"}`);
        const data = Object.assign(recipe.data[0]);
        commit(getRecipe, data)
    },

    //TODO: Create recipe
    //TODO: Delete recipe
    //TODO: Edit recipe
}

const mutations = {
    [getRecipes](state, payload) {
        Object.assign(state, {allRecipes: payload});
    },
    [getRecipe](state, payload) {
        Object.assign(state, {recipe: payload});
    }
}

export default {
    getters,
    mutations,
    actions,
    state: initialState
}