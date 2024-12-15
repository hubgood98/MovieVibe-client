import { createRouter, createWebHistory } from 'vue-router';
import MovieSearch from '@/components/MovieSearch.vue';
import MovieDetail from '@/components/MovieDetail.vue';

const routes = [
    {
        path: '/movies',
        name: 'MovieSearch',
        component: MovieSearch,
    },
    {
        path: '/movies/detail/:id',
        name: 'MovieDetail',
        component: MovieDetail,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
