<template>
  <div>Очищаем данные</div>
</template>

<script>
export default {
  head: { title: `Выход | ${process.env.appName}` },
  layout: "admin",
  middleware: ["admin-auth"],
  beforeCreate() {
    this.$store.dispatch("auth/logout");
    this.$router.push("/admin/login?message=logout");
  },
};
</script>

<style lang="scss" scoped>
</style>