<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="red lighten-2" disable-resize-watcher dark>
            <v-list>
                <router-link class="routerLink" to="/">
                    <v-img src="../../assets/logo.png" aspect-ratio="1.4"></v-img>
                </router-link>

                <template v-for="item in items">
                    <v-list-item :key="item.id">
                        <v-list-item-content>
                            <v-btn text :to="item.title">
                                {{
                                item.title
                                }}
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${item.id}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar color="red lighten-1" dark>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link class="routerLink" to="/">
                <v-toolbar-title to="/">{{ appTitle }}</v-toolbar-title>
            </router-link>
            <router-link class="routerLink" to="/about">
                <v-btn text class="hidden-sm-and-down">About</v-btn>
            </router-link>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div v-if="!isAuth" class="hidden-sm-and-down">
                <router-link class="routerLink" to="/login">
                    <v-btn text class="hidden-sm-and-down">Login</v-btn>
                </router-link>
                <router-link class="routerLink" to="/register">
                    <v-btn text class="hidden-sm-and-down">Register</v-btn>
                </router-link>
            </div>
            <div v-else>
                <div class="routerLink">
                    <v-btn text class="hidden-sm-and-down" @click="logout" data-cy="logout">Logout</v-btn>
                </div>
            </div>
        </v-app-bar>
    </span>
</template>

<script>
import { actionTypes as userActionTypes } from '../../auth/authState';

export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Cook Book',
            isAuth: this.$store.state.authState.isAuth,
            drawer: false,
            items: [
                { id: 0, title: 'About' },
                { id: 1, title: 'Login' },
                { id: 2, title: 'Register' }
            ]
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$store.dispatch(userActionTypes.logoutSuccess);
            this.isAuth = false;
        }
    },
    created() {
        this.$bus.$on('logged', () => {
            this.isAuth = this.$store.state.authState.isAuth;
        });
    }
};
</script>

<style scoped>
.routerLink {
    text-decoration: none;
    color: white;
}
</style>
