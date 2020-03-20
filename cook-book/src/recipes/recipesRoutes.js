export default [
    {
        path: '/recipes/create',
        name: 'CreateRecipe',
        component: () => import('./components/CreateRecipe.vue'),
        meta: {
            isAuthenticated: true
        }
    },
];
