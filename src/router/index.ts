import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import MovieSearch from '@/components/MovieSearch.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/movies',
        name: 'MovieSearch',
        component: MovieSearch,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
