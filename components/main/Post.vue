<template>
  <el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
    <header slot="header" class="post-header">
      <h3>Post title</h3>
      <small>
        <i class="el-icon-time"></i>
        {{ new Date().toLocaleString()}}
      </small>
    </header>
    <div class="post-body">
      <img
        class="post-img"
        src="https://images.wallpaperscraft.ru/image/anime_devushka_kot_komnata_625_2560x1600.jpg"
        alt="кот"
      />
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Открыть</el-button>
      <span>
        <i class="el-icon-message">12</i>
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  methods: {
    openPost() {
      const id = "131";
      this.$router.push(`/post/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  margin-bottom: 1.5rem;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-img {
  width: 100%;
  height: auto;
}

.post-footer {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>