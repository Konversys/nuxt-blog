<template>
  <div class="page-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mb">
      <el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
      <el-breadcrumb-item>Пост {{ $route.params.id}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
      <!-- <el-row type="flex" justify="center">
        <h1>Панель администратора</h1>
      </el-row>-->
      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>{{ new Date(post.date).toLocaleString() }}</span>
        </small>
        <small>
          <i class="el-icon-message"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>
      <el-form-item label="Текст в формате md или html" prop="login">
        <el-input v-model.trim="controls.text" type="textarea" resize="none" :rows="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">Обновить</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  head() {
    return {
      title: `Пост | ${this.post.title}`
    };
  },
  validate({ params }) {
    return !!Number(params.id);
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchAdminById", params.id);
    return {
      post
    };
  },
  data() {
    return {
      loading: false,
      controls: {
        text: ""
      },
      rules: {
        text: [
          {
            required: true,
            message: "Текст не может быть пустым",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          const formData = {
            text: this.controls.text,
            id: this.post.id
          };
          try {
            await this.$store.dispatch("post/update", formData);
            this.$message.success("Пост обновлен");
          } catch (error) {
            this.$message.error("Пост не обновлен");
          } finally {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 75%;
  min-width: 400px;
}
.mr {
  margin-right: 2rem;
}
@media screen and (max-width: 1560px) {
  .page-wrap {
    width: 100%;
  }
}
</style>