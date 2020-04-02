<template>
    <v-app>
        <app-navigation></app-navigation>
        <v-content transition="slide-x-transition">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components: {
        AppNavigation: () => import('@/shared/components/AppNavigation')
    }
};
</script>

<style>
a {
    text-decoration: none !important;
    color: #fff !important;
}
.container {
    background-color: #fff !important;
}
.md-theme-default {
    background-color: #fff;
}
.link {
    color: #000 !important;
    text-decoration: none !important;
}
</style>
