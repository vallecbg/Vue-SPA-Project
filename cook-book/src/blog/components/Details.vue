<template>
    <main class="container my-5">
        <div class="row">
            <div class="col-12 text-center my-3">
                <h2 class="mb-3 display-3 text-uppercase">
                    {{ article.title }}
                </h2>
                <h4>Creator</h4>
                <router-link
                    class="link"
                    :to="{ path: `/users/${user._id}` }"
                    >{{ user.name }}</router-link
                >
                <div v-if="article.creator === currentUser">
                    <h4>Manage Article</h4>
                    <v-row class="d-inline-flex">
                        <v-col>
                            <v-btn
                                :to="{
                                    path: `/blog/edit/${article._id}`
                                }"
                                dark
                                depressed
                                color="green"
                                >Edit</v-btn
                            >
                        </v-col>
                        <v-col>
                            <v-btn
                                :loading="loading"
                                @click="deleteArticle({ id: article._id })"
                                dark
                                depressed
                                color="red"
                                >Delete</v-btn
                            >
                        </v-col>
                    </v-row>
                </div>
                <!-- <h4>Created On</h4>
                <p>{{ article._kmd.lmt }}</p> -->
            </div>
            <div class="col-md-5 mb-4">
                <img
                    class="img-fluid"
                    style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
                    :src="article.imageUrl"
                    alt
                />
            </div>
            <div class="col-md-7">
                <v-card class="article-details">
                    <span v-html="article.content"></span>
                </v-card>
            </div>
            <div class="col-md-12">
                <v-card class="white">
                    <v-flex xs12>
                        <h1 class="headline mb-0">Comments</h1>
                        <vue-disqus
                            shortname="cookbook-6"
                            class="link"
                        ></vue-disqus>
                    </v-flex>
                </v-card>
            </div>
        </div>
    </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getArticle, deleteArticle } from '../blogState';
import { getUser } from '../../users/usersState';
export default {
    name: 'Details',
    data() {
        return {
            loading: false,
            articleId: null,
            currentUser: localStorage.getItem('userId')
        };
    },
    computed: {
        ...mapGetters(['article', 'user'])
    },
    methods: {
        ...mapActions([getArticle, deleteArticle, getUser]),

        deleteArticle(id) {
            this.loading = true;
            this[deleteArticle](id);
            this.loading = false;
            this.$router.push(`/users/${this.currentUser}`, () => {});
        }
    },
    beforeMount() {
        this.articleId = this.$route.params.id;
        this.loading = true;
        this[getArticle]({ id: this.articleId });
        this[getUser]({ id: this.article.creator });
        this.loading = false;
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
.article-details {
    padding: 10px 10px 10px 10px;
}
.a {
    color: #000 !important;
    text-decoration: none !important;
}
.author a {
    color: #000 !important;
}
</style>
