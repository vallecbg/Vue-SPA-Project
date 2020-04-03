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
    },
    {
        path: '/blog/edit/:id',
        name: 'EditArticle',
        component: () => import('./components/EditArticle.vue'),
        meta: {
            isAuthenticated: true
        }
    }
];
