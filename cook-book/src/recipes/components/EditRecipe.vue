<template>
    <div v-if="recipe" class="wrraper">
        <v-row align="center" class="card">
            <h2>Edit Recipe</h2>
            <v-form @submit.prevent="editRecipe" v-model="valid" ref="editForm">
                <v-text-field v-model="recipe.title" :rules="titleRules" label="Title"></v-text-field>
                <v-autocomplete
                    v-model="recipe.category"
                    :rules="categoryRules"
                    :items="categories"
                    :loading="loading"
                    label="Category"
                ></v-autocomplete>
                <v-autocomplete
                    v-model="recipe.subCategory"
                    :rules="subCategoryRules"
                    :items="subCategories"
                    :loading="loading"
                    label="Subcategory"
                ></v-autocomplete>

                <v-text-field
                    v-model.number="recipe.prepTime"
                    :rules="timeRules"
                    :loading="loading"
                    type="number"
                    label="Prep Time (hours)"
                />
                <v-text-field
                    v-model.number="recipe.cookTime"
                    :rules="timeRules"
                    :loading="loading"
                    type="number"
                    label="Cook Time (hours)"
                />
                <v-text-field
                    v-model.number="recipe.servings"
                    :rules="timeRules"
                    :loading="loading"
                    type="number"
                    label="Number of servings"
                />

                <div
                    v-for="(ingredient, ingIndex) in recipe.ingredients"
                    :key="`${ingIndex}-${ingredient}`"
                >
                    <v-row>
                        <v-text-field
                            v-model="ingredient.value"
                            :rules="ingredientRules"
                            :loading="loading"
                            label="Ingredient"
                        ></v-text-field>
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="red"
                            :loading="loading"
                            @click="removeIngredient(ingIndex)"
                        >
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-row>
                </div>
                <v-btn class="ma-2" dark color="green" :loading="loading" @click="addIngredient">
                    <v-icon left dark>mdi-plus</v-icon>Ingredient
                </v-btn>

                <div v-for="(step, stepIndex) in recipe.steps" :key="stepIndex+99">
                    <v-row>
                        <v-text-field
                            v-model="step.value"
                            :loading="loading"
                            :rules="stepRules"
                            label="Step"
                        ></v-text-field>
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="red"
                            :loading="loading"
                            @click="removeStep(stepIndex)"
                        >
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-row>
                </div>
                <v-btn class="ma-2" dark color="green" :loading="loading" @click="addStep">
                    <v-icon left dark>mdi-plus</v-icon>Step
                </v-btn>

                <v-textarea
                    v-model="recipe.description"
                    :rules="descriptionRules"
                    :loading="loading"
                    label="Description"
                    counter="350"
                />

                <v-container class="actions">
                    <v-btn
                        type="submit"
                        :disabled="!valid"
                        :loading="loading"
                        color="success"
                        class="mr-4"
                        width="300"
                    >Edit Recipe</v-btn>
                </v-container>
                <v-divider></v-divider>
            </v-form>
        </v-row>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getRecipe, editRecipe } from '../recipesState';

export default {
    name: 'EditRecipe',
    data() {
        return {
            recipeId: null,

            valid: true,
            loading: false,
            titleRules: [
                v => !!v || 'Title is required',
                v =>
                    (v && v.length >= 3) ||
                    'Title must be at least 3 characters'
            ],
            categories: ['Soups', 'With Meat', 'Супи : Чорби и супи'],
            categoryRules: [v => !!v || 'Category is required'],
            subCategories: ['Soups', 'With Meat', 'Супи : Чорби и супи'],
            subCategoryRules: [v => !!v || 'Sub Category is required'],
            timeRules: [
                v => !!v || 'This field is required',
                v => (v && v > 0) || 'Must be more than 0'
            ],
            ingredientRules: [v => !!v || 'Ingredient is required'],
            stepRules: [v => !!v || 'Step is required'],

            descriptionRules: [v => !!v || 'This field is required']
        };
    },
    computed: {
        ...mapGetters(['recipe'])
    },
    methods: {
        ...mapActions([getRecipe]),

        addIngredient: function() {
            this.recipe.ingredients.push({ value: '' });
        },
        removeIngredient: function(ingIndex) {
            this.recipe.ingredients.splice(ingIndex, 1);
        },
        addStep: function() {
            this.recipe.steps.push({ value: '' });
        },
        removeStep: function(stepIndex) {
            this.recipe.steps.splice(stepIndex, 1);
        },

        ...mapActions([editRecipe]),
        async editRecipe() {
            this.loading = true;
            await this[editRecipe]({
                _id: this.recipe._id,
                title: this.recipe.title,
                description: this.recipe.description,
                category: this.recipe.category,
                subCategory: this.recipe.subCategory,
                prepTime: this.recipe.prepTime,
                cookTime: this.recipe.cookTime,
                servings: this.recipe.servings,
                ingredients: this.recipe.ingredients,
                steps: this.recipe.steps,
                imageUrl: this.recipe.imageUrl,
                creator: this.recipe.creator
            });
            this.loading = false;
            //TODO: route to recipe details
            this.$router.push('/', () => {});
        }
    },
    created() {
        this.recipeId = this.$route.params.id;
        this[getRecipe]({ id: this.recipeId });
    }
};
</script>
<style scoped>
.actions {
    margin-bottom: 15px;
}
.text {
    margin-top: 15px;
}
.wrraper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    border-radius: 0.5em;
    box-shadow: 0 0 1em gray;
    padding: 40px 50px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.95);
}
h2 {
    margin-bottom: 40px;
}
</style>