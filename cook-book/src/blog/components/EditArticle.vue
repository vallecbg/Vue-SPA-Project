<template>
    <div class="wrraper">
        <v-row align="center" class="card">
            <h2>Edit Article</h2>
            <v-form @submit.prevent="editArticle" v-model="valid" ref="editForm">
                <v-text-field v-model="article.title" :rules="titleRules" label="Title"></v-text-field>

                <vue-editor class="link" v-model="article.content" />

                <v-container class="actions">
                    <v-btn
                        type="submit"
                        :disabled="!valid"
                        :loading="loading"
                        color="success"
                        class="mr-4"
                        width="100%"
                    >Edit Article</v-btn>
                </v-container>
                <v-divider></v-divider>
            </v-form>
        </v-row>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { editArticle, getArticle } from '../blogState';
import { VueEditor } from 'vue2-editor';
export default {
    name: 'EditArticle',
    components: {
        VueEditor
    },
    data() {
        return {
            articleId: null,

            valid: true,
            loading: false,
            titleRules: [
                v => !!v || 'Title is required',
                v =>
                    (v && v.length >= 3) ||
                    'Title must be at least 3 characters'
            ],
        };
    },
    computed: {
        ...mapGetters(['article'])
    },
    methods: {
        ...mapActions([getArticle]),

        ...mapActions([editArticle]),
        async editArticle() {
            this.loading = true;
            await this[editArticle]({
                _id: this.article._id,
                title: this.article.title,
                content: this.article.content,
                imageUrl: this.article.imageUrl,
                creator: this.article.creator
            });
            this.loading = false;
            this.$router.push('/', () => {});
        }
    },
    created() {
        this.articleId = this.$route.params.id;
        this[getArticle]({ id: this.articleId });
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
.link {
    text-decoration: none !important;
    color: #000 !important;
}
</style>
