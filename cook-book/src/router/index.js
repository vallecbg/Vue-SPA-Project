import Vue from 'vue';
import Router from 'vue-router';
import authState from '../auth/authState';
import authRoutes from '../auth/authRoutes.js';
import recipesRoutes from '../recipes/recipesRoutes';
import usersRoutes from '../users/usersRoutes';

Vue.use(Router);

const appRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../shared/views/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../shared/views/About.vue'),
        meta: {
            isAuthenticated: true
        }
    }
];

const routes = [...appRoutes, ...authRoutes, ...recipesRoutes, ...usersRoutes];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isAuthenticated)) {
        if (!authState.state.isAuth) {
            next({
                path: '/login'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
