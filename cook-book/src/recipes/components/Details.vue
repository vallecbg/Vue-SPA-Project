<template>
    <main class="container my-5">
        <div class="row">
            <div class="col-12 text-center my-3">
                <h2 id="title" class="mb-3 display-3 text-uppercase">
                    {{ recipe.title }}
                </h2>
            </div>
            <div class="col-md-6 mb-4">
                <img
                    id="image-url"
                    class="img-fluid"
                    style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
                    :src="recipe.imageUrl"
                    alt
                />
            </div>
            <div class="col-md-6">
                <div class="recipe-details">
                    <h4>Creator</h4>
                    <router-link
                        id="user-name"
                        class="link"
                        :to="{ path: `/users/${user._id}` }"
                        >{{ user.name }}</router-link
                    >
                    <h4>Category</h4>
                    <v-chip id="category" class="amber dark--text mb-3 mt-2">{{
                        recipe.category
                    }}</v-chip>
                    <h4>Sub Category</h4>
                    <v-chip id="subCategory" class="amber dark--text mb-3 mt-2">{{
                        recipe.subCategory
                    }}</v-chip>
                    <h4>⏱ Preparation time</h4>
                    <p id="prepTime">{{ recipe.prepTime }} hours</p>
                    <h4>🕒 Cooking time</h4>
                    <p id="cookTime">{{ recipe.cookTime }} hours</p>
                    <h4>Servings</h4>
                    <p id="servings">{{ recipe.servings }} portions</p>
                    <h4>Description</h4>
                    <p id="description">{{ recipe.description }}</p>
                    <div v-if="recipe.creator === currentUser">
                        <h4>Manage Recipe</h4>
                        <v-row class="d-inline-flex">
                            <v-col>
                                <v-btn
                                    id="edit-recipe"
                                    :to="{
                                        path: `/recipes/edit/${recipe._id}`
                                    }"
                                    dark
                                    depressed
                                    color="green"
                                    >Edit</v-btn
                                >
                            </v-col>
                            <v-col>
                                <v-btn
                                    id="delete-recipe"
                                    :loading="loading"
                                    @click.native="deleteRecipe({ id: recipe._id })"
                                    dark
                                    depressed
                                    color="red"
                                    >Delete</v-btn
                                >
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </div>

            <v-card
                v-show="recipe.ingredients !== [] && recipe.steps !== []"
                class="white mx-auto"
            >
                <v-layout row wrap class="recipe_content_wrap">
                    <v-flex xs12 md6 order-md2>
                        <h1 class="headline mb-0">Ingredients:</h1>
                        <v-list avatar>
                            <v-list-item-group
                                v-for="(item, index) in recipe.ingredients"
                                :key="index"
                            >
                                <v-list-item-content class="ml-n12">
                                    <v-list-item-title>
                                        <v-icon
                                            class="amber--text text--darken-2"
                                            >md_fiber_manual_record</v-icon
                                        >
                                        {{ item.value }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item-group>
                        </v-list>
                    </v-flex>
                    <v-flex xs12 md6>
                        <h1 class="headline mb-0">Preparation:</h1>
                        <div v-for="(item, index) in recipe.steps" :key="index">
                            <p class="recipe_content">
                                {{ index + 1 }}. {{ item.value }}
                            </p>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>
    </main>
</template>
<script>
//TODO: Add the name of the creator of the recipe
//TODO: Add comments box (optional)
import { mapGetters, mapActions } from 'vuex';
import { getRecipe, deleteRecipe } from '../recipesState';
import { getUser } from '../../users/usersState';

export default {
    name: 'RecipeDetails',
    data() {
        return {
            loading: false,
            recipeId: null,
            currentUser: localStorage.getItem('userId')
        };
    },
    computed: {
        ...mapGetters(['recipe', 'user'])
    },
    methods: {
        ...mapActions([getRecipe, deleteRecipe, getUser]),

        deleteRecipe(id) {
            this.loading = true;
            this[deleteRecipe](id);
            this.loading = false;
            this.$router.push('/', () => {});
        }
    },
    beforeMount() {
        this.recipeId = this.$route.params.id;
        this[getRecipe]({ id: this.recipeId });
        this[getUser]({ id: this.recipe.creator });
    }
};
</script>
<style scoped>
.recipe_content_wrap {
    padding: 10px 20px;
}
.recipe_content {
    padding-top: 15px;
    padding-left: 10px;
}
.link {
    text-decoration: none !important;
    color: #000 !important;
}
</style>
