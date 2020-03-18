export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./components/Register.vue')
    }
];
