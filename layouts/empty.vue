<template>
  <el-container :style="{ height: '100vh' }">
    <el-main class="empty-layout">
      <el-row type="flex" justify="center">
        <nuxt />
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(value) {
      this.$message.error(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-layout {
  height: 100vh;
  padding: 0;
  padding-top: 2rem;
}
</style>