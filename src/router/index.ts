import { createRouter, createWebHistory } from 'vue-router';
import MovieSearch from '@/components/MovieSearch.vue';

const routes = [
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
