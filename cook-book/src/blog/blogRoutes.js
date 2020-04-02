export default [
    {
        path: '/blog/create',
        name: 'AddArticle',
        component: () => import('./components/AddArticle.vue'),
        meta: {
            isAuthenticated: true
        }
    }
];
