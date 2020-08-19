<template>
  <div>
    <h1>Аналитика по постам</h1>
    <AppAnalyticChart title="Количество просмотров" :labels="views.labels" :data="views.data" />
    <AppAnalyticChart
      title="Количество комментариев"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import AppAnalyticChart from "@/components/admin/AnalyticChart";
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  components: { AppAnalyticChart },
  async asyncData({ store }) {
    const { comments, views } = await store.dispatch("post/getAnalytics");
    return {
      comments,
      views,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>