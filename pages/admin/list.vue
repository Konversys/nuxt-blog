<template>
  <el-table :data="posts" style="width: 100%">
    <el-table-column prop="title" label="Заголовок" />
    <el-table-column label="Дата">
      <template slot-scope="{row: {date}}">
        <i class="el-icon-time"></i>
        <span>{{ new Date(date).toLocaleString() }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Просмотры">
      <template slot-scope="{row: {views}}">
        <i class="el-icon-message"></i>
        <span>{{ views }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Комментарии">
      <template slot-scope="{ row: {comments}}">
        <i class="el-icon-chat-line-square"></i>
        <span>{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Операции">
      <template slot-scope="{row}">
        <el-button size="mini" circle type="primary" icon="el-icon-edit" @click="open(row._id)"/>
        <el-button size="mini" circle type="danger" icon="el-icon-delete" @click="remove(row._id)"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetchAdmin");
    return {
      posts
    };
  },
  methods: {
    open(id) {
      console.log('open', id);
      
    },
    remove(id) {
      console.log('remove', id);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>