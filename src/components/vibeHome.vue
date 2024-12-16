<template>
  <div class="vibe-home container d-flex justify-content-center align-items-center">
    <div class="movie-list-section position-relative">

      <button
          class="btn btn-secondary scroll-button left"
          @click="scrollLeft">‹
      </button>

      <!-- 영화 리스트 -->
      <div class="movie-list d-flex flex-nowrap overflow-hidden" ref="containerRef">
        <div
            class="movie-card flex-shrink-0 d-flex justify-content-center"
            v-for="movie in visibleMovies"
            :key="movie.id">
          <div class="card">
            <img
                class="card-img-top"
                :src="movie.poster_path"
                :alt="`${movie.title} 포스터`"/>
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">
                <span
                    v-for="index in getTotalStars(movie.vote_average)"
                    :key="`filled-${index}`"
                    class="fa fa-star text-warning"
                ></span>
                <span
                    v-for="index in 5 - getTotalStars(movie.vote_average)"
                    :key="`empty-${index}`"
                    class="fa fa-star-o"
                ></span>
                <span>({{ movie.vote_average.toFixed(1) }})</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 스크롤 버튼 -->
      <button
          class="btn btn-secondary scroll-button right"
          @click="scrollRight"
      >
        ›
      </button>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';

const movies = ref([]);
const containerRef = ref(null);
const currentIndex = ref(0); //몇번째 리스트인지 표시하는값
const itemsPerPage = 5;

const fetchMovies = async () => {
  try {
    const response = await axios.get(
        'http://localhost:8080/api/movies/list?voteAverageOrder=desc&size=15'
    );
    movies.value = response.data.content;
  } catch (err) {
    console.error('Error fetching movies:', err);
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

const getTotalStars = (voteAverage) => Math.round(voteAverage / 2);
</script>


<style lang="scss" scoped>
.movie-list-section {
  margin-top: 50px;
  position: relative;
  width: 80%;
}

.movie-list {
  display: flex;
  gap: 15px;
  transition: transform 0.5s ease-in-out;
}

.movie-card {
  flex: 0 0 auto;
  width: 150px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.card-body {
  padding: 8px;

  .card-title {
    font-size: 0.875rem;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .card-text {
    font-size: 0.75rem;
    color: #666;
    line-height: 1.2;

    .fa-star {
      color: #ffa500;
    }

    .fa-star-o {
      color: #ddd;
    }
  }
}

/* 버튼 스타일 */
.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 30px;
  height: 30px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6c757d;
  border: none;
  color: white;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }

  &.left {
    left: -15px;
  }

  &.right {
    right: -15px;
  }
}
</style>
