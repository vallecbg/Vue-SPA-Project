<template>
    <v-container grid-list-lg>
        <v-layout row wrap class="meal-plans">
            <v-flex v-for="recipe in allRecipes" :key="recipe._id" xs12 sm12 md4>
                <v-card>
                    <v-list-item>
                        <!-- <v-list-item-avatar color="grey"></v-list-item-avatar> -->
                        <v-list-item-content>
                            <v-list-item-title class="headline">{{recipe.title}}</v-list-item-title>
                            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-responsive>
                        <v-img :src="recipe.imageUrl" height="500px"></v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">{{recipe.title}}</h3>
                            <div>{{recipe.description}}</div>
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            outlined
                            block
                            color="red"
                            :to="{ path: `recipes/${recipe._id}` }"
                        >Read More</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { getRecipes } from '../recipesState';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'list',
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['allRecipes'])
    },
    created(){
        this[getRecipes]();
    },
    methods: {
        ...mapActions([getRecipes])
    }
};
</script>
