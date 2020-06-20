<template>
  <div>
    <el-container class="form-add-user-wrapper">
      <el-form
        ref="form"
        :model="controls"
        :rules="rules"
        label-width="90px"
        @submit.native.prevent="onSubmit"
      >
        <el-row type="flex" justify="center" class="form-add-user-header">
          <span>Добавить пользователя</span>
        </el-row>
        <el-form-item label="Логин" prop="login">
          <el-input v-model.trim="controls.login"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model.trim="controls.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Роль" prop="role">
          <el-select v-model.trim="controls.role" placeholder="Выберите роль">
            <el-option label="Пользователь" value="admin"></el-option>
            <el-option label="Администратор" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button type="primary" native-type="submit" :loading="loading">Добавить пользователя</el-button>
        </el-row>
      </el-form>
    </el-container>
    <hr />
    <el-table :data="users" stripe style="width: 100%">
      <el-table-column prop="login" label="Логин" width="180"></el-table-column>
      <el-table-column prop="password" label="Пароль" width="180"></el-table-column>
      <el-table-column prop="role" label="Роль"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password,
              role: this.controls.role
            };
            await this.$store.dispatch("auth/createUser", formData);
            this.$message.success("Пользователь успешно создан");

            this.controls.login = "";
            this.controls.password = "";
            this.controls.role = "user";

            this.loading = false;
          } catch (error) {
            this.$message.error("Ошибка при создании пользователя");
            this.loading = false;
          }
        }
      });
    }
  },
  data() {
    return {
      loading: false,
      controls: {
        login: "",
        password: "",
        role: ""
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
        ],
        role: [
          {
            required: true,
            message: "Выберите роль",
            trigger: "change"
          }
        ]
      },
      users: [
        {
          login: "Mike",
          password: "asdf",
          role: "admin"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.form-add-user-wrapper {
  margin-bottom: 2rem;
}

.form-add-user-header {
  margin: 0.5rem 0 1rem 0;
}
</style>