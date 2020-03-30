<template>
    <v-card>
        <v-list-item>
            <!-- <v-list-item-avatar color="grey"></v-list-item-avatar> -->
            <v-list-item-content>
                <v-list-item-title class="headline">{{recipe.title}}</v-list-item-title>
                <v-list-item-subtitle>by <router-link class="link" :to="{path: `/users/${user._id}`}">{{user.name}}</router-link></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-responsive>
            <v-img :src="recipe.imageUrl" height="500px"></v-img>
        </v-responsive>

        <v-card-text>
            <div>
                <h3 class="headline mb-0">{{recipe.title}}</h3>
                <div>{{recipe.description}}</div>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn outlined block color="red" :to="{ path: `recipes/${recipe._id}` }">Read More</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { getUser } from '../../users/usersState';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'RecipeCard',
    props: ['recipe'],
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['user'])
    },
    beforeMount() {
        this[getUser](this.recipe.creator)
    },
    methods: {
        ...mapActions([getUser])
    }
};
</script>
<style scoped>
.link {
    text-decoration: none !important;
    color: #000 !important;
}
</style>