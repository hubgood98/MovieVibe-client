<script setup>
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top" style="background: rgba(0, 0, 0, 1);" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Movie Vibe</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">영화</a> <!--활성화 색상필요시 class에 actice 추가하기-->
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">이벤트</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Title" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="ms-3">
          <button class="btn btn-outline-light" @click="$emit('show-login')">로그인</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">

.navbar {
  transition: background 0.3s; /* 배경 색상 전환 애니메이션 추가 */
}
</style>
