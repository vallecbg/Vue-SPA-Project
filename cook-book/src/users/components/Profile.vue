<template>
    <div v-if="user" class="wrapper">
        <Parallax
            class="section page-header header-filter"
            :style="headerStyle"
        ></Parallax>
        <div class="main main-raised">
            <div class="section profile-content">
                <div class="container">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-50 mx-auto">
                            <div class="profile">
                                <div class="avatar">
                                    <img
                                        :src="img"
                                        alt="Circle Image"
                                        class="img-raised rounded-circle img-fluid"
                                    />
                                </div>
                                <div class="name">
                                    <h3 class="title">{{ user.name }}</h3>
                                    <h6>Username: {{ user.username }}</h6>
                                    <h6>Email: {{ user.email }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="description text-center">
                        <p>
                            {{ user.city }}, {{ user.country }}, {{ user.zip }}
                        </p>
                        <div class="my-2">
                            <v-btn dark color="green">Follow</v-btn>
                        </div>
                    </div>
                    <div class="profile-tabs">
                        <tabs
                            :tab-name="['Recipes', 'Articles']"
                            :tab-icon="['menu_book', 'assignment']"
                            plain
                            nav-pills-icons
                            color-button="success"
                        >
                            <!-- here you can add your content for tab-content -->
                            <template slot="tab-pane-1">
                                <div class="md-layout">
                                    <v-container grid-list-lg>
                                        <v-layout row wrap class="meal-plans">
                                            <v-flex
                                                v-for="recipe in userRecipes"
                                                :key="recipe._id"
                                                xs12
                                                sm12
                                                md4
                                            >
                                                <RecipeCard :recipe="recipe" />
                                            </v-flex>
                                        </v-layout>
                                        <p
                                            v-if="userRecipes.length === 0"
                                            class="text-center my-5"
                                        >
                                            The user hasn't created a recipe
                                            yet!
                                        </p>
                                    </v-container>
                                </div>
                            </template>
                            <template slot="tab-pane-2">
                                <div class="md-layout">
                                    <v-container grid-list-lg>
                                        <v-layout row wrap class="meal-plans">
                                            <v-flex
                                                v-for="article in userArticles"
                                                :key="article._id"
                                                xs12
                                                sm12
                                                md4
                                            >
                                                <ArticleCard :article="article" />
                                            </v-flex>
                                        </v-layout>
                                        <p
                                            v-if="userArticles.length === 0"
                                            class="text-center my-5"
                                        >
                                            The user hasn't created an article
                                            yet!
                                        </p>
                                    </v-container>
                                </div>
                            </template>
                        </tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tabs from './shared/Tabs.vue';
import Parallax from './shared/Parallax.vue';
import RecipeCard from '../../recipes/components/RecipeCard';
import ArticleCard from '../../blog/components/ArticleCard'
import { mapGetters, mapActions } from 'vuex';
import { getUser, getUserRecipes, getUserArticles } from '../usersState';
export default {
    components: {
        Tabs,
        Parallax,
        RecipeCard,
        ArticleCard
    },
    bodyClass: 'profile-page',
    data() {
        return {
            userId: null,
        };
    },
    props: {
        header: {
            type: String,
            default: require('@/assets/header.jpg')
        },
        img: {
            type: String,
            default: require('@/assets/img/default-avatar.png')
        }
    },
    computed: {
        ...mapGetters(['user', 'userRecipes', 'userArticles']),
        headerStyle() {
            return {
                backgroundImage: `url(${this.header})`
            };
        }
    },
    methods: {
        ...mapActions([getUser, getUserRecipes, getUserArticles])
    },
    created() {
        this.userId = this.$route.params.id;
        if (this.userId) {
            this[getUser]({ id: this.userId }, () => {
                console.log(this.user);
            });
            this[getUserRecipes]({ id: this.userId }, () => {
                console.log(this.userRecipes);
            });
            this[getUserArticles]({ id: this.userId });
        }
    }
};
</script>

<style lang="scss" scoped>
.section {
    padding: 0;
}

.profile-tabs::v-deep {
    .md-card-tabs .md-list {
        justify-content: center;
    }

    [class*='tab-pane-'] {
        img {
            margin-bottom: 2.142rem;
        }
    }
    .md-theme-default {
        background-color: transparent !important;
    }
}
</style>
