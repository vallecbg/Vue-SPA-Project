<template>
    <div class="wrapper">
        <Parallax class="section page-header header-filter" :style="headerStyle"></Parallax>
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
                                    <h3 class="title">{{user.name}}</h3>
                                    <h6>Username: {{user.username}}</h6>
                                    <h6>Email: {{user.email}}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="description text-center">
                        <p>{{user.city}}, {{user.country}}, {{user.zip}}</p>
                        <div class="my-2">
                            <v-btn dark color="green">Follow</v-btn>
                        </div>
                    </div>
                    <div class="profile-tabs">
                        <tabs
                            :tab-name="['Created Recipes', 'Work', 'Favorite']"
                            :tab-icon="['camera', 'palette', 'favorite']"
                            plain
                            nav-pills-icons
                            color-button="success"
                        >
                            <!-- here you can add your content for tab-content -->
                            <template slot="tab-pane-1">
                                <div class="md-layout">
                                    <div class="md-layout-item md-size-25 ml-auto">
                                        <img :src="tabPane1[0].image" class="rounded" />
                                        <img :src="tabPane1[1].image" class="rounded" />
                                    </div>
                                    <div class="md-layout-item md-size-25 mr-auto">
                                        <img :src="tabPane1[3].image" class="rounded" />
                                        <img :src="tabPane1[2].image" class="rounded" />
                                    </div>
                                </div>
                            </template>
                            <template slot="tab-pane-2">
                                <div class="md-layout">
                                    <div class="md-layout-item md-size-25 ml-auto">
                                        <img :src="tabPane2[0].image" class="rounded" />
                                        <img :src="tabPane2[1].image" class="rounded" />
                                        <img :src="tabPane2[2].image" class="rounded" />
                                    </div>
                                    <div class="md-layout-item md-size-25 mr-auto">
                                        <img :src="tabPane2[3].image" class="rounded" />
                                        <img :src="tabPane2[4].image" class="rounded" />
                                    </div>
                                </div>
                            </template>
                            <template slot="tab-pane-3">
                                <div class="md-layout">
                                    <div class="md-layout-item md-size-25 ml-auto">
                                        <img :src="tabPane3[0].image" class="rounded" />
                                        <img :src="tabPane3[1].image" class="rounded" />
                                    </div>
                                    <div class="md-layout-item md-size-25 mr-auto">
                                        <img :src="tabPane3[2].image" class="rounded" />
                                        <img :src="tabPane3[3].image" class="rounded" />
                                        <img :src="tabPane3[4].image" class="rounded" />
                                    </div>
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
import { mapGetters, mapActions } from 'vuex';
import { getUser } from '../usersState';
export default {
    components: {
        Tabs,
        Parallax
    },
    bodyClass: 'profile-page',
    data() {
        return {
            userId: null,
            tabPane1: [
                { image: require('@/assets/img/examples/studio-1.jpg') },
                { image: require('@/assets/img/examples/studio-2.jpg') },
                { image: require('@/assets/img/examples/studio-4.jpg') },
                { image: require('@/assets/img/examples/studio-5.jpg') }
            ],
            tabPane2: [
                { image: require('@/assets/img/examples/olu-eletu.jpg') },
                { image: require('@/assets/img/examples/clem-onojeghuo.jpg') },
                { image: require('@/assets/img/examples/cynthia-del-rio.jpg') },
                {
                    image: require('@/assets/img/examples/mariya-georgieva.jpg')
                },
                { image: require('@/assets/img/examples/clem-onojegaw.jpg') }
            ],
            tabPane3: [
                {
                    image: require('@/assets/img/examples/mariya-georgieva.jpg')
                },
                { image: require('@/assets/img/examples/studio-3.jpg') },
                { image: require('@/assets/img/examples/clem-onojeghuo.jpg') },
                { image: require('@/assets/img/examples/olu-eletu.jpg') },
                { image: require('@/assets/img/examples/studio-1.jpg') }
            ]
        };
    },
    props: {
        header: {
            type: String,
            default: require('@/assets/header.jpg')
        },
        img: {
            type: String,
            default: require('@/assets/img/faces/christian.jpg')
        }
    },
    computed: {
        ...mapGetters(['user']),
        headerStyle() {
            return {
                backgroundImage: `url(${this.header})`
            };
        }
    },
    methods: {
        ...mapActions([getUser])
    },
    created() {
        this.userId = this.$route.params.id;
        this[getUser]({ id: this.userId });
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
    .md-theme-default{
        background-color: transparent !important;
    }
}
</style>
