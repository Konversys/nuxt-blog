const posts = [
  {
    title: "post",
    date: new Date(),
    views: 22,
    comments: [1, 2],
    _id: 1
  },
  {
    title: "post2",
    date: new Date(),
    views: 23,
    comments: [1, 2],
    _id: 2
  }
];

export const actions = {
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts);
      }, 1000);
    });
  },
  async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts.find(x => x._id == id));
      }, 1000);
    });
  },
  async create({ commit }, { title, text, image }) {
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("text", text);
      fd.append("image", image, image.name);
      return await this.$axios.$post("/api/post/admin/", fd);
    } catch (error) {
      commit("setError", error, { root: true });
      throw error;
    }
  },
  async remove({}, id) {},
  async update({}, { id, text }) {}
};
