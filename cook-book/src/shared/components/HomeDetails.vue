<template>
    <v-container id="homeDetails">
        <v-layout column>
            <v-flex class="display-2 text-center my-5">The newest recipes</v-flex>
            <List v-if="isAuth" />
            <p v-else class="text-center my-5">
                Please, <router-link to="/login">log-in</router-link> or <router-link to="/register"> register</router-link> to see the recipes!
            </p>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'HomeDetails',
    components: {
        List: () => import('../../recipes/components/List' )
    },
    computed: {
        ...mapGetters(['isAuth'])
    }
};
</script>

<style scoped></style>
