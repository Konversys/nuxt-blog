<template>
  <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
    <el-row type="flex" justify="center">
      <h1>Комментарии</h1>
    </el-row>
    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model.trim="controls.name"></el-input>
    </el-form-item>
    <el-form-item label="Текст комментария" prop="text">
      <el-input type="textarea" v-model.trim="controls.text" resize="none" :rows="2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" native-type="submit" round>Добавить комментарий</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      controls: {
        name: "",
        text: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Введите ваше имя",
            trigger: "blur"
          },
          {
            min: 2,
            max: 100,
            message: "Имя должно быть длинной 2 и более буквы",
            trigger: "blur"
          }
        ],
        text: [
          {
            required: true,
            message: "Введите комментарий",
            trigger: "blur"
          },
          {
            min: 1,
            max: 4000,
            message: "Текст комментария должен быть от 1 до 4000 символов",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: ""
          };

          try {
            this.$message.success("Комментарий успешно добавлен");
            this.$emit("created");
          } catch (e) {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>