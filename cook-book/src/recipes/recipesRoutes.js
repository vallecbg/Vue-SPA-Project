export default [
    {
        path: '/recipes/create',
        name: 'CreateRecipe',
        component: () => import('./components/CreateRecipe.vue'),
        meta: {
            isAuthenticated: true
        }
    },
    {
        path: '/recipes/:id',
        name: 'RecipeDetails',
        component: () => import('./components/Details.vue'),
        meta: {
            isAuthenticated: true
        }
    },
    {
        path: '/recipes/edit/:id',
        name: 'EditRecipe',
        component: () => import('./components/EditRecipe.vue'),
        meta: {
            isAuthenticated: true
        }
    }
];
