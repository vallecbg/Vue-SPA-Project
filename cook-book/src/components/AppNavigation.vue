<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="red lighten-2" disable-resize-watcher dark>
            
            <v-list>
                <v-img src="../assets/logo.png" aspect-ratio="1.4"></v-img>
                <template v-for="item in items">
                    <v-list-item :key="item.id">
                        <v-list-item-content>
                            <v-btn text>{{item.title}}</v-btn>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${item.id}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="red lighten-1" dark>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-toolbar-title>{{appTitle}}</v-toolbar-title>
            <v-btn text class="hidden-sm-and-down">Menu</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn text class="hidden-sm-and-down">SIGN IN</v-btn>
            <v-btn text class="hidden-sm-and-down">SIGN UP</v-btn>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: "Cook Book",
            drawer: false,
            items: [
                {id: 0, title: 'Menu'},
                {id: 1, title: 'Sign In'},
                {id: 2, title: 'Sign Up'}
            ]
        }
    }
};
</script>

<style scoped>
</style>