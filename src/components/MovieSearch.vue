<template>
  <div>
    <h1>영화 검색</h1>
    <input v-model="title" placeholder="영화 제목 입력" />
    <button @click="searchMovies">검색</button>

    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} - 평점: {{ movie.rating }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      title: '',
      movies: [] as { id: number; title: string; rating: number }[]
    };
  },
  methods: {
    searchMovies() {
      const params = {
        title: this.title,
        adult: false,
        page: 0,
        size: 10
      };

      axios.get('http://localhost:8080/api/movies/search', { params })
          .then(response => {
            this.movies = response.data.content; // 페이징 처리된 데이터에서 영화 목록 추출
          })
          .catch(error => {
            console.error('영화 검색 오류:', error);
          });
    }
  }
});
</script>

<style scoped>
/* 스타일 추가 */
</style>
