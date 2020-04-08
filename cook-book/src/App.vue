<template>
    <v-app>
        <app-navigation></app-navigation>
        <v-content>
            <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
            </transition>
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
