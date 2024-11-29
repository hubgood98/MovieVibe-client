<template>
  <section id="recentlyMovie" class="container">
    <div class="row">
      <div v-if="paginatedMovies.length === 0">영화 정보가 없습니다.</div>
      <div class="col-6 col-md-3 mb-4" v-for="(movie, index) in paginatedMovies" :key="movie.id">
        <div class="card">
          <img :src="movie.poster_path" class="card-img-top" alt="영화 포스터" />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">평점: {{ movie.vote_average }}</p>
          </div>
        </div>
      </div>
      <button v-if="paginatedMovies.length > 0" @click="loadMore" class="btn btn-primary">더 보기</button>
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

$card-height: 200px; // 카드 이미지의 높이 변수 정의

.card {
  width: 100%;

  .card-img-top {
    width: 100%; // 이미지 너비를 카드에 맞춤
    height: auto; // 비율 유지
    object-fit: cover; // 비율 유지하면서 채우기
    max-height: $card-height; // 최대 높이 설정
  }
}

.row {
  justify-content: flex-start; // 왼쪽 정렬
}

.card {
  margin-bottom: 1rem; // 카드 간의 간격 추가
}
</style>
