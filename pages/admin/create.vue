<template>
  <div class="form-wrap">
    <el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
      <h1 class="mb">Создать пост</h1>
      <el-form-item label="Наименование поста" prop="title">
        <el-input v-model.trim="controls.title"></el-input>
      </el-form-item>
      <el-form-item label="Текст в формате md или html" prop="login">
        <el-input v-model.trim="controls.text" type="textarea" resize="none" :rows="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">Создать пост</el-button>
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
      title: "Создание поста"
    };
  },
  data() {
    return {
      loading: false,
      controls: {
        text: "",
        title: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Название поста не может быть пустым",
            trigger: "blur"
          }
        ],
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
            title: this.controls.title,
            text: this.controls.text
          };
          try {
            await this.$store.dispatch("post/create", formData);
            this.controls.title = "";
            this.controls.text = "";
            this.$message.success("Пост создан");
          } catch (error) {
            this.$message.error("Пост не создан");
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
.form-wrap {
  width: 75%;
}

@media screen and (max-width: 1500px) {
  .form-wrap {
    width: 100%;
  }
}
</style>