<template>
  <el-card class="comment">
    <div class="comment-header">
      <span class="comment-header__name">{{ comment.name }}</span>
      <small>
        <i class="el-icon-time"></i>
        {{ comment.date | date }}
      </small>
    </div>
    <div class="comment-text">{{ comment.text }}</div>
  </el-card>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
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