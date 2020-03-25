<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="red lighten-2" disable-resize-watcher dark>
            <v-list>
                <router-link class="routerLink" to="/">
                    <v-img src="../../assets/logo.png" aspect-ratio="1.4"></v-img>
                </router-link>

                <v-list-item v-if="isAuth">
                    <v-list-item-content>
                        <v-btn text to="/recipes/create">Create Recipe</v-btn>
                    </v-list-item-content>
                </v-list-item>
                <v-divider v-if="isAuth"></v-divider>

                <v-list-item v-if="!isAuth">
                    <v-list-item-content>
                        <v-btn text to="/login">Login</v-btn>
                    </v-list-item-content>
                </v-list-item>
                <v-divider v-if="!isAuth"></v-divider>
                
                <v-list-item v-if="!isAuth">
                    <v-list-item-content>
                        <v-btn text to="/register">Register</v-btn>
                    </v-list-item-content>
                </v-list-item>
                <v-divider v-if="!isAuth"></v-divider>

                <v-list-item v-if="isAuth">
                    <v-list-item-content>
                        <v-btn text @click="logout">Logout</v-btn>
                    </v-list-item-content>
                </v-list-item>
                <v-divider v-if="isAuth"></v-divider>

            </v-list>
        </v-navigation-drawer>
        <v-app-bar color="red lighten-1" dark>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link class="routerLink" to="/">
                <v-toolbar-title class="headerText" to="/">{{ appTitle }}</v-toolbar-title>
            </router-link>
            <router-link class="routerLink" to="/recipes/create">
                <v-btn text class="hidden-sm-and-down">Create Recipe</v-btn>
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
import { logoutSuccess } from '../../auth/authState';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Cook Book',
            drawer: false
        };
    },
    computed: {
        ...mapGetters(['isAuth'])
    },
    methods: {
        ...mapActions([logoutSuccess]),
        logout(){
            this[logoutSuccess]();
            this.$router.push('/', () => {});
        }
    }
};
</script>

<style scoped>
.headerText{
    font-size: 30px !important;
    font-family: 'Bubblegum Sans', cursive;
}
.routerLink {
    text-decoration: none;
    color: white;
}
</style>
