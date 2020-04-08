<template>
    <v-container grid-list-lg>
        <v-layout row wrap class="meal-plans">
            <v-flex
                v-for="recipe in allRecipes"
                :key="recipe._id"
                xs12
                sm12
                md4
            >
                <RecipeCard
                    class="animated bounceInDown delay-1s"
                    :recipe="recipe"
                />
            </v-flex>
        </v-layout>
        <p v-if="allRecipes.length === 0" class="text-center my-5">
            There are no recipes yet! Let's
            <router-link to="/recipes/create">create</router-link> a one!
        </p>
    </v-container>
</template>

<script>
import { getRecipes } from '../recipesState';
import { mapGetters, mapActions } from 'vuex';
import RecipeCard from './RecipeCard';
export default {
    name: 'RecipesList',
    components: {
        RecipeCard
    },
    data() {
        return {
            recipes: []
        };
    },
    computed: {
        ...mapGetters(['allRecipes'])
    },
    beforeMount() {
        this[getRecipes]();
    },
    methods: {
        ...mapActions([getRecipes])
    }
};
</script>
