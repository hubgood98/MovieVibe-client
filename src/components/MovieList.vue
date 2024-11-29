<template>
  <section id="recentlyMovie" class="container">
    <div class="row justify-content-center"> <!-- 가운데 정렬을 위한 justify-content-center 추가 -->
      <div v-if="paginatedMovies.length === 0">영화 정보가 없습니다.</div>
      <div class="col-6 col-md-4 mb-4" v-for="(movie, index) in paginatedMovies" :key="movie.id"> <!-- 너비를 4로 조정 -->
        <div class="card">
          <img :src="movie.poster_path" class="card-img-top" alt="영화 포스터" />
          <div class="card-body">
            <h5 class="card-title" style="font-size: 1.25rem;">{{ movie.title }}</h5> <!-- 글자 크기 조정 -->
            <p class="card-text" style="font-size: 0.9rem;">평점: {{ movie.vote_average }}</p> <!-- 글자 크기 조정 -->
          </div>
        </div>
      </div>
      <div class="text-center w-100"> <!-- 버튼을 가운데 정렬 -->
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

$card-height: 500px; // 카드 이미지의 높이 변수 정의

.card {
  width: 100%; // 카드 너비를 100%로 설정하여 열에 맞게 조정

  .card-img-top {
    width: 100%; // 이미지 너비를 카드에 맞춤
    height: fit-content; // 비율 유지
    object-fit: cover; // 비율 유지하면서 채우기
    max-height: $card-height; // 최대 높이 설정
  }
}

.row {
  justify-content: center; // 카드들을 가운데 정렬
}

.card {
  margin-bottom: 1rem; // 카드 간의 간격 추가
}
</style>
