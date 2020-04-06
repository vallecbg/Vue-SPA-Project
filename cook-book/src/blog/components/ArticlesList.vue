<template>
    <v-container grid-list-lg>
        <v-layout row wrap class="meal-plans">
            <v-flex
                v-for="article in allArticles"
                :key="article._id"
                xs12
                sm12
                md4
            >
                <ArticleCard class="animated bounceInDown delay-1s" :article="article" />
            </v-flex>
        </v-layout>
        <p v-if="allArticles.length === 0" class="text-center my-5">
            There are no articles yet! Let's
            <router-link to="/blog/create">create</router-link> a one!
        </p>
    </v-container>
</template>

<script>
import { getArticles } from '../blogState';
import { mapGetters, mapActions } from 'vuex';
import ArticleCard from './ArticleCard';
export default {
    name: 'ArticlesList',
    components: {
        ArticleCard
    },
    data() {
        return {
            articles: []
        };
    },
    computed: {
        ...mapGetters(['allArticles'])
    },
    beforeMount() {
        this[getArticles]();
    },
    methods: {
        ...mapActions([getArticles])
    }
};
</script>
