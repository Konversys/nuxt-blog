<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ $moment(post.date).format('LLL') }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{ post.views }}
        </small>
      </div>
      <div class="post-image">
        <img class="post-img" :src="post.imageUrl" />
      </div>
    </header>
    <main class="post-content">
      <vue-markdown>{{post.text}}</vue-markdown>
    </main>
    <footer>
      <AppCommentForm @created="createCommentHandler" v-if="canAddComment" />
      <div class="comments" v-if="post.comments.length">
        <AppComment v-for="comment in post.comments" :key="comment._id" :comment="comment" />
      </div>
      <div class="text-center" v-else>Нет комментариев</div>
    </footer>
  </article>
</template>

<script>
import AppComment from "@/components/main/Comment";
import AppCommentForm from "@/components/main/CommentForm";
export default {
  components: { AppComment, AppCommentForm },
  validate({ params }) {
    return !!params.id;
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchById", params.id);
    await store.dispatch("post/addView", post);
    return {
      post: { ...post, views: ++post.views }
    };
  },
  data() {
    return {
      canAddComment: true
    };
  },
  methods: {
    createCommentHandler() {
      this.canAddComment = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  max-width: 1200px;
  margin: 0 auto;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.post-img {
  width: 100%;
  height: auto;
}

.post-header {
  margin-bottom: 1.5rem;
}

.post-content {
  margin-bottom: 2rem;
}
</style>