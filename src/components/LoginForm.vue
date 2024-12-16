<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";

const accountId = ref('');
const password = ref('');

const router = useRouter(); // router instance

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/login', {
      accountId: accountId.value,
      password: password.value,
    });
    console.log('로그인 성공: ', response.data);
    router.push('/happy');  // redirecting to home
  } catch (error) {
    console.log('로그인 실패: ', error.response?.data || error.message);
    alert('로그인에 실패했습니다. 다시 시도해 주세요.');
  }
};

</script>

<template>
  <div class="modal fade show d-block" tabindex="-1" style="display: block;" aria-modal="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">로그인</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="accountId" class="form-label">아이디</label>
              <input type="text" :value="accountId" @input="accountId = $event.target.value" class="form-control"/>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">비밀번호</label>
              <input type="password" :value="password" @input="password = $event.target.value" class="form-control"/>
            </div>
            <button type="submit" class="btn btn-primary">확인</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 배경 어둡게 */
  z-index: 1050;
}
</style>