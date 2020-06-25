export const state = () => ({
  token: null
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const { token } = this.$axios.$post("/api/auth/admin/login", formData);
      console.log("token", token);
      dispatch("setToken", token);
    } catch (error) {
      commit("setError", error, { root: true });
      throw error;
    }
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  logout({ commit }) {
    commit("clearToken");
  },
  async createUser({ commit }, formData) {
    try {
      console.log("create user", formData);
    } catch (error) {}
  }
};

export const getters = {
  isAuthenticated: state => !!state.token
};
