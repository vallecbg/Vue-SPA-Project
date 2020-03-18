<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout justify-center align-center column pa-5>
            <div class="display-4 font-weight-black yellow--text text-center">
                HEALTHY MEALS
            </div>
            <div
                class="display-4 font-weight-black yellow--text text-center mb-3"
            >
                FOR YOUR TABLE
            </div>
            <div class="display-1 font-weight-bold yellow--text text-center">
                Finally be a foodie at home with fresh meals using our platform.
            </div>
            <v-btn fab class="mt-5 white">
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
