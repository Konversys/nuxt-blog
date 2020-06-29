<template>
  <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8">
    <el-card shadow="always">
      <el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
        <el-row type="flex" justify="center">
          <h1>Панель администратора</h1>
        </el-row>
        <el-form-item label="Логин" prop="login">
          <el-input v-model.trim="controls.login"></el-input>
        </el-form-item>
        <div class="mb2">
          <el-form-item label="Пароль" prop="password">
            <el-input v-model.trim="controls.password" type="password"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">Войти</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-col>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      loading: false,
      controls: {
        login: "",
        password: ""
      },
      rules: {
        login: [
          {
            required: true,
            message: "Введите логин",
            trigger: "blur"
          },
          {
            min: 4,
            max: 16,
            message: "Логин должен быть длинной от 4 до 16 символов",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Введите пароль",
            trigger: "blur"
          },
          {
            min: 4,
            max: 16,
            message: "Пароль должен быть от 4 до 16 символов",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    const { message } = this.$route.query;
    switch (message) {
      case "login":
        this.$message.info(
          "Для доступа к админ панели авторизуйтесь в системе"
        );
        break;
      case "logout":
        this.$message.info("Вы вышли из системы");
        break;
      case "session":
        this.$message.warning("Время сессии истекло");
      default:
        break;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            };

            await this.$store.dispatch("auth/login", formData);
            this.$router.push("/admin");

            this.loading = false;
          } catch (error) {
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