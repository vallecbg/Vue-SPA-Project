<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout
            justify-center
            align-center
            column
            pa-5
            style="height: auto !important; padding: 0 !important;"
        >
            <div
                class="display-4 font-weight-black yellow--text text-center animated bounceIn delay-1s"
            >
                HEALTHY MEALS
            </div>
            <div
                class="display-4 font-weight-black yellow--text text-center mb-3 animated bounceIn delay-1s"
            >
                FOR YOUR TABLE
            </div>
            <div
                class="display-1 font-weight-bold yellow--text text-center animated slideInLeft delay-1s"
            >
                Finally be a foodie at home with fresh meals using our platform.
            </div>
            <v-btn
                @click="$vuetify.goTo('#homeDetails')"
                fab
                class="mt-5 white hidden-sm-and-down animated fadeIn delay-1s"
            >
                <v-icon large color="yellow">arrow_downward</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<style scoped>
.home-hero {
    background: url('../../assets/header.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
