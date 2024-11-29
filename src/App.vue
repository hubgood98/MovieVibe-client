<template>
<div>
  <Navibar/>
  <div class="container" style="margin-top:50px">

  <MovieList
      :paginated-movies="movies"
      :load-more="loadMore" />
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navibar from "@/components/Navibar.vue";
import MovieList from "@/components/MovieList.vue";

const movies = ref([]); // 영화 목록 저장
const currentPage = ref(0); // 현재 페이지 번호
const pageSize = 10; // 한 페이지에 보여줄 영화 수

const fetchMovies = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/movies/search?page=${page}&size=${pageSize}`);
    movies.value = response.data.content; // API로부터 영화 목록 저장
    console.log("영화 목록:", movies.value); // 영화 목록 확인
  } catch (error) {
    console.error('영화 데이터를 가져오는 데 오류가 발생했습니다:', error);
  }
};

const loadMore = () => {
  currentPage.value++;
  fetchMovies(currentPage.value); // 다음 페이지의 영화 목록 요청
};

onMounted(() => {
  console.log("컴포넌트가 마운트되었습니다.");
  fetchMovies(); // 컴포넌트가 마운트될 때 초기 영화 목록 요청
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>
