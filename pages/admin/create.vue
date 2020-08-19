<template>
  <div class="form-wrap">
    <el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
      <h1 class="mb">Создать пост</h1>
      <el-form-item label="Наименование поста" prop="title">
        <el-input v-model="controls.title"></el-input>
      </el-form-item>
      <el-form-item label="Текст в формате md или html" prop="login">
        <el-input v-model="controls.text" type="textarea" resize="none" :rows="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="previewDialog = true">Предпросмотр</el-button>
        <el-button type="primary" native-type="submit" :loading="loading">Создать пост</el-button>
      </el-form-item>
      <el-upload
        class="mb"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
        :on-change="handleImageChange"
        ref="upload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Перенесите файл
          <em>или нажмите сюда</em>
        </div>
        <div class="el-upload__tip" slot="tip">jpg/png файлы размером меньше 500kb</div>
      </el-upload>
      <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
        <div :key="controls.text">
          <vue-markdown>{{controls.text}}</vue-markdown>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  head: { title: `Создание поста | ${process.env.appName}` },
  data() {
    return {
      image: null,
      previewDialog: false,
      loading: false,
      controls: {
        text: "",
        title: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "Название поста не может быть пустым",
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "Текст не может быть пустым",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleImageChange(file, fileList) {
      this.image = file.raw;
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true;
          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image,
          };
          try {
            await this.$store.dispatch("post/create", formData);
            this.controls.title = "";
            this.controls.text = "";
            this.image = null;
            this.$refs.upload.clearFiles();
            this.$message.success("Пост создан");
          } catch (error) {
            this.$message.error("Пост не создан");
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning("Добавьте изображение");
        }
      });
    },
  },
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