<template>
  <div class="vibe-home container text-center mt-4">
    <h2 class="movie-chart-title mb-4">🎬 무비차트</h2>
    <div class="movie-list-section position-relative">
      <!-- 왼쪽 스크롤 버튼 -->
      <button class="btn scroll-button left" @click="scrollLeft">‹</button>

      <!-- 영화 리스트 -->
      <div class="movie-list d-flex flex-nowrap overflow-hidden" ref="containerRef">
        <div
            class="movie-card flex-shrink-0 position-relative"
            v-for="(movie, index) in visibleMovies"
            :key="movie.id">
          <!-- 순위 배지 -->
          <span class="rank-badge">{{ currentIndex + index + 1 }}</span>
          <div class="card" @click="goToMovieDetail(movie.id)">
            <!-- 포스터 이미지 -->
            <img class="card-img-top" :src="movie.poster_path" :alt="`${movie.title} 포스터`" />
            <div class="card-body">
              <!-- 영화 제목 -->
              <h5 class="card-title">{{ movie.title }}</h5>
              <!-- 평점 -->
              <p class="card-text text-secondary mb-1">
                평점: {{ movie.vote_average.toFixed(1) }} ⭐
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 스크롤 버튼 -->
      <button class="btn scroll-button right" @click="scrollRight">›</button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const movies = ref([]);
const containerRef = ref(null);
const currentIndex = ref(0);
const itemsPerPage = 5;

let router = useRouter();

const fetchMovies = async () => {
  try {
    const response = await axios.get(
        "http://localhost:8080/api/movies/list?voteAverageOrder=desc&size=15"
    );
    movies.value = response.data.content;
  } catch (err) {
    console.error("Error fetching movies:", err);
    movies.value = [];
  }
};

const visibleMovies = ref([]);

const updateVisibleMovies = () => {
  visibleMovies.value = movies.value.slice(
      currentIndex.value,
      currentIndex.value + itemsPerPage
  );
};

const scrollLeft = () => {
  currentIndex.value =
      currentIndex.value - itemsPerPage < 0
          ? movies.value.length - itemsPerPage
          : currentIndex.value - itemsPerPage;
  updateVisibleMovies();
};

const scrollRight = () => {
  currentIndex.value =
      currentIndex.value + itemsPerPage >= movies.value.length
          ? 0
          : currentIndex.value + itemsPerPage;
  updateVisibleMovies();
};

onMounted(async () => {
  await fetchMovies();
  updateVisibleMovies();
});

//상세 정보 페이지로의 이동을 처리하는 함수
const goToMovieDetail = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } });
};
</script>

<style lang="scss" scoped>
/* 전체 레이아웃 고정 */

.vibe-home {
  width: 100%;
  position: relative;
}

.movie-list-section {
  position: relative;

  width: 850px; /* 고정 너비 */
  max-width: 90%;
  margin: 0 auto;
  overflow: visible;
  display: flex;
  justify-content: center;
}

.movie-list {
  display: flex;
  gap: 15px; /* 카드 사이 여백 */
  transition: transform 0.5s ease-in-out;
}

.movie-card {
  flex: 0 0 auto; /* 고정 크기 */
  width: 150px; /* 포스터 너비 */
  height: 270px; /* 포스터 및 제목 포함 높이 */
  text-align: center;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  position: relative;

  .card {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 200px; /* 이미지 고정 높이 */
      object-fit: cover; /* 이미지 비율 유지 */
    }

    .card-body {
      padding: 5px;

      .card-title {
        font-size: 0.85rem;
        font-weight: bold;
        color: #333;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .card-text {
        font-size: 0.8rem;
        color: #555;
        margin-top: 3px;
      }
    }
  }
}

/* 순위 배지 스타일 */
.rank-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff5722; /* 주황색 배경 */
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

/* 스크롤 버튼 스타일 */
.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &.left {
    left: -20px;
  }

  &.right {
    right: -20px;
  }
}
</style>
