<template>
  <section>
    <h1>{{ movie.title }}</h1>
    <!-- 기타 영화 세부 정보를 표시합니다. -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const movie = ref({});

onMounted(async () => {
  const { data } = await axios.get(`/api/movies/${route.params.id}`);
  movie.value = data;
});
</script>

<style scoped>
/* 스타일 규칙 */
</style>