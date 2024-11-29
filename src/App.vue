<template>
  <Navibar />
  <div class="hero">
    <div class="image-container">
      <div class="gradient-overlay"></div> <!-- 그라데이션 오버레이 추가 -->
      <img src="https://image.tmdb.org/t/p/original/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg" alt="Background img" class="hero-image" />
      <h2 class="hero-title">모아나 2</h2>
      <p class="hero-description">바다를 누볐던 선조들에게서 예기치 못한 부름을 받은 모아나가 마우이와 다시 만나 새로운 선원들과 함께 오랫동안 잊혀진 멀고 위험한 바다 너머로 떠나는 특별한 모험을 담은 이야기</p>
    </div>
    <div class="container text-center">
      <MovieList :paginated-movies="movies" :load-more="loadMore" />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
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
  width: 100%; // 화면 가로 크기 100% 차지
  color: white; // 글자 색상
}

.image-container {
  position: relative; // 이미지 컨테이너를 상대적으로 설정
  height: 500px; // 원하는 높이로 수정 (예: 500px)
  width: 100%; // 너비 100%
  overflow: hidden; // 이미지가 컨테이너를 넘지 않도록 설정
}

.hero-image {
  width: 100%; // 너비를 100%로 설정
  height: 100%; // 높이를 100%로 설정
  object-fit: cover; // 비율 유지하면서 채우기
  filter: brightness(0.4); // 이미지 밝기 조절 (어둡게)
}

.gradient-overlay {
  position: absolute; /* 절대 위치로 설정 */
  top: 0; /* 상단에서 시작 */
  left: 0; /* 왼쪽에서 시작 */
  width: 100%; /* 너비 100% */
  height: 100%; /* 높이 100% */
  background: linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.8) 100%); /* 그라데이션 효과 */
  z-index: 2; /* 이미지 위에 표시되도록 설정 */
}

.hero-title {
  position: absolute; // 제목 요소를 절대 위치로 설정
  top: 50%; // 배경 이미지의 절반 위치
  left: 50px; // 좌측 여백
  transform: translateY(-50%); // 수직 중앙 정렬
  z-index: 3; // 제목이 이미지 위에 표시되도록 설정
  font-size: 3rem; // 제목 크기 조정
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); // 텍스트 그림자 추가
}

.hero-description {
  position: absolute; // 설명 요소를 절대 위치로 설정
  top: calc(50% + 40px); // 제목 아래에 위치
  left: 50px; // 좌측 여백
  z-index: 3; // 설명이 이미지 위에 표시되도록 설정
  font-size: 1.25rem; // 설명 크기 조정
  width: calc(100% - 100px); // 좌우 여백을 고려한 너비 설정
  max-width: 600px; // 최대 너비 설정
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); // 텍스트 그림자 추가
  word-wrap: break-word; // 긴 단어가 있을 경우 줄바꿈
}

.container {
  position: relative;
  z-index: 2; // 영화 목록이 필터 위에 표시되도록 설정
  padding: 20px; // 상하 여백 추가
}
</style>
