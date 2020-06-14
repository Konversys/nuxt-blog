<template>
  <el-card class="comment">
    <div class="comment-header">
      <span class="comment-header__name">Person name</span>
      <small>
        <i class="el-icon-time"></i>
        {{ new Date().toLocaleString()}}
      </small>
    </div>
    <div
      class="comment-text"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.comment {
  margin-bottom: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .comment-header__name {
    font-size: 1rem;
  }
}

.comment-text {
  white-space: pre-line;
  font-size: 0.9rem;
}
</style>