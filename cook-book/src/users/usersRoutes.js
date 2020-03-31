export default [
    {
        path: '/users/:id',
        name: 'Profile',
        component: () => import('./components/Profile.vue'),
        meta: {
            isAuthenticated: true
        }
    }
];
