<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="red lighten-2" disable-resize-watcher dark>
            <v-list>
                <router-link class="routerLink" to="/">
                    <v-img src="../assets/logo.png" aspect-ratio="1.4"></v-img>
                </router-link>

                <v-list-item>
                    <router-link class="routerLink" to="/about">
                        <v-list-item-content>
                            <v-btn text>About</v-btn>
                        </v-list-item-content>
                    </router-link>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <router-link class="routerLink" to="/login">
                        <v-list-item-content>
                            <v-btn text>Login</v-btn>
                        </v-list-item-content>
                    </router-link>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <router-link class="routerLink" to="/register">
                        <v-list-item-content>
                            <v-btn text>Register</v-btn>
                        </v-list-item-content>
                    </router-link>
                </v-list-item>
                <v-divider></v-divider>
                <!-- <template v-for="item in items">
                    <v-list-item :key="item.id">
                        <v-list-item-content>
                            <v-btn text>{{item.title}}</v-btn>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${item.id}`"></v-divider>
                </template> -->

            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="red lighten-1" dark>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link class="routerLink" to="/">
                <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
            </router-link>
            <router-link class="routerLink" to="/about">
                <v-btn text class="hidden-sm-and-down">About</v-btn>
            </router-link>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <router-link class="routerLink" to="/login">
                <v-btn text class="hidden-sm-and-down">Login</v-btn>
            </router-link>
            <router-link class="routerLink" to="/register">
                <v-btn text class="hidden-sm-and-down">Register</v-btn>
            </router-link>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Cook Book',
            drawer: false
        };
    }
};
</script>

<style scoped>
.routerLink {
    text-decoration: none;
    color: white;
}
</style>