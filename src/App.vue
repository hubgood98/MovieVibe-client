<template>
  <div>
    <Navibar class="navibar" @show-login="showLoginForm = true" />
    <router-view class="router-view" />"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navibar from '@/components/Navibar.vue';

const showLoginForm = ref(false); // 로그인 모달 표시 상태 초기화
</script>

<style lang="scss">
.navibar {
  position: fixed; /* 화면 상단에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1000;
  background-color: #333; /* 배경색 */
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.router-view {
  padding-top: 60px; /* 네비게이션 바의 높이만큼 여백 추가 */
}
</style>
