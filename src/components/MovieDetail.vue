<template>
  <div class="hero">
    <div class="image-container">
      <div class="gradient-overlay"></div> <!-- 그라데이션 오버레이 추가 -->
      <img src="https://image.tmdb.org/t/p/original/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg" alt="Background img" class="hero-image" />
      <h2 class="hero-title">모아나 디테일 테스트</h2>
      <p class="hero-description">오랫동안 잊혀진 멀고 위험한 바다 너머로 떠나는 특별한 모험을 담은 이야기</p>
    </div>
    <div class="container text-center">
      <MovieList :paginated-movies="movies" :load-more="loadMore" />
    </div>
    <LoginForm v-if="showLoginForm" @close="showLoginForm = false"/>
  </div>
  <section>
    <h1>{{ movie.title }}</h1>
    <!-- 기타 영화 세부 정보를 표시합니다. -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import MovieList from "@/components/MovieList.vue";
import LoginForm from "@/components/LoginForm.vue";

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