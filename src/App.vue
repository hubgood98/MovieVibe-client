<template>
  <div class="bg-black">
    <Navibar />
    <div class="hero" style="margin-top: 50px;">
      <h2 class="hero-title">영화 제목</h2>
      <div class="container text-center">  <!-- 가운데 정렬을 위한 text-center 클래스 추가 -->
        <MovieList
            :paginated-movies="movies"
            :load-more="loadMore" />
      </div>
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
const pageSize = 8; // 한 페이지에 보여줄 영화 수

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
.hero {
  position: relative;
  background-image: url('http://image.tmdb.org/t/p/original/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg'); // 배경 이미지 URL
  background-size: cover;
  background-position: top center;
  height: 400px; // 원하는 높이 설정
  display: flex;
  align-items: center;
  color: white;
}

.hero-title {
  position: absolute;
  top: 20px; // 상단 여백 조정
  left: 20px; // 좌측 여백 조정
  font-size: 2.5rem; // 제목 크기 조정
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); // 텍스트 그림자 추가
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); // 어두운 필터
  z-index: 1; // 필터가 텍스트 위에 위치하도록 설정
}

.container {
  position: relative;
  z-index: 2; // 영화 목록이 필터 위에 표시되도록 설정
}

.card {
  width: 100%;
}
</style>
