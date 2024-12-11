<template>
  <section id="recentlyMovie" class="container">
    <div class="row justify-content-center">
      <div v-if="paginatedMovies.length === 0" class="col-12 text-center">영화 정보가 없습니다.</div>
      <div class="col-12 col-md-6 col-lg-3 mb-4" v-for="(movie, index) in paginatedMovies" :key="movie.id">
        <div class="card h-100 shadow-lg">
          <img :src="movie.poster_path" class="card-img-top" alt="영화 포스터" />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">평점: {{ movie.vote_average }}</p>
          </div>
        </div>
      </div>
      <div class="text-center w-100">
        <button v-if="paginatedMovies.length > 0" @click="loadMore" class="btn btn-primary">더 보기</button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  paginatedMovies: {
    type: Array,
    required: true,
  },
  loadMore: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
$card-height: 400px; // 카드 이미지의 높이 변수 정의

.card {
  width: 100%; // 카드 너비를 100%로 설정하여 열에 맞게 조정
  border-radius: 10px; // 카드 모서리를 둥글게
  overflow: hidden; // 카드 내부 요소가 넘치지 않도록 설정
  transition: transform 0.3s; // 카드 전환 효과
  background-color: #1c1c1c; // 카드 배경 색상 설정
}

.card:hover {
  transform: translateY(-5px); // 마우스 오버 시 카드 살짝 위로 이동
}

.card-img-top {
  width: 100%; // 이미지 너비를 카드에 맞춤
  height: 400px; // 이미지 높이 고정
  object-fit: cover; // 비율 유지하면서 채우기
}

.row {
  justify-content: center; // 카드들을 가운데 정렬
}

.card-body {
  color: white; // 텍스트 색상
}

.card-title {
  font-size: 1.25rem; // 제목 크기 조정
  font-weight: bold; // 제목 두껍게
}

.card-text {
  font-size: 0.9rem; // 평점 글자 크기 조정
}

.btn-primary {
  background-color: #007bff; // 버튼 색상 설정
  border: none; // 버튼 테두리 제거
  padding: 10px 20px; // 버튼 패딩
  border-radius: 5px; // 버튼 모서리 둥글게
  transition: background-color 0.3s; // 버튼 색상 전환 효과
}

.btn-primary:hover {
  background-color: #0056b3; // 마우스 오버 시 버튼 색상 변경
}
</style>
