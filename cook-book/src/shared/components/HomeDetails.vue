<template>
    <v-container id="homeDetails">
        <v-layout column>
            <v-flex
                class="display-2 text-center my-5 animated slideInUp delay-1s"
                >The newest recipes</v-flex
            >
            <RecipesList v-if="isAuth" />
            <p v-else class="text-center my-5 animated slideInUp delay-1s">
                Please,
                <router-link class="text-link" to="/login">log-in</router-link>
                or
                <router-link class="text-link" to="/register">
                    register</router-link
                >
                to see the recipes!
            </p>
        </v-layout>
        <v-layout column>
            <v-flex
                class="display-2 text-center my-5 animated slideInUp delay-1s"
                >More from our blog</v-flex
            >
            <ArticlesList v-if="isAuth" />
            <p v-else class="text-center my-5 animated slideInUp delay-1s">
                Please,
                <router-link class="text-link" to="/login">log-in</router-link>
                or
                <router-link class="text-link" to="/register">
                    register</router-link
                >
                to see the articles!
            </p>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'HomeDetails',
    components: {
        RecipesList: () => import('../../recipes/components/RecipesList'),
        ArticlesList: () => import('../../blog/components/ArticlesList')
    },
    computed: {
        ...mapGetters(['isAuth'])
    }
};
</script>

<style scoped>
.text-link {
    color: blue !important;
}
</style>
