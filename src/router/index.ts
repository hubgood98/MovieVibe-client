import { createRouter, createWebHistory } from 'vue-router';
import vibeHome from '@/components/vibeHome.vue';
import MovieDetail from '@/components/MovieDetail.vue';

const routes = [
    {
        path: '/',
        name: '홈페이지',
        component: vibeHome,
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
