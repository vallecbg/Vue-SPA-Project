<template>
    <v-container>
        <v-layout column>
            <v-flex class="display-2 text-center my-5">The newest recipes</v-flex>
            <List />
        </v-layout>
    </v-container>
</template>

<script>
import List from '../../recipes/components/List' 
export default {
    name: 'HomeDetails',
    components: {
        List
    }
};
</script>

<style scoped></style>
