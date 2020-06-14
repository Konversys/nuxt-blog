<template>
  <div class="error-layout">
    <div class="error-content">
      <h1 class="error-title">Страница не найдена</h1>
      <nuxt-link to="/">Вернуться на главную</nuxt-link>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.error-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-title {
  color: #f00505;
  margin-bottom: 1rem;
}
</style>