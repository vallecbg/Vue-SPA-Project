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
    createRecipe: '[RECIPE] CREATE NEW RECIPE SUCCESS',
    //deleteRecipe: '[RECIPE] DELETE RECIPE SUCCESS',
}

export const {
    getRecipes,
    getRecipe,
    createRecipe
} = actionTypes;

const getters = {
    allRecipes: state => state.allRecipes,
    recipe: state => state.recipe,
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

    async[createRecipe]({commit}, payload) {
        const recipe = Object.assign(payload);
        const { data } = await http.post('recipes', recipe);
        commit(createRecipe, {recipe: data});
    }

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
    },
    [createRecipe](state, payload) {
        const { recipe } = payload;
        const list = state.allRecipes.concat(recipe);
        Object.assign(state, {allRecipes: list});
    }
}

export default {
    getters,
    mutations,
    actions,
    state: initialState
}