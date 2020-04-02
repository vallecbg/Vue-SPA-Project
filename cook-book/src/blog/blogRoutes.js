export default [
    {
        path: '/blog/create',
        name: 'AddArticle',
        component: () => import('./components/AddArticle.vue'),
        meta: {
            isAuthenticated: true
        }
    },
    {
        path: '/blog/:id',
        name: 'ArticleDetails',
        component: () => import('./components/Details.vue'),
        meta: {
            isAuthenticated: true
        }
    }
];
