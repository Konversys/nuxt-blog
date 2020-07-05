import Cookie from "cookie";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

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
      const { token } = await this.$axios.$post(
        "/api/auth/admin/login",
        formData
      );
      dispatch("setToken", token);
    } catch (error) {
      commit("setError", error, { root: true });
      throw error;
    }
  },
  setToken({ commit }, token) {
    this.$axios.setToken(token, "Bearer");
    commit("setToken", token);
    Cookies.set("token", token);
  },
  logout({ commit }) {
    this.$axios.setToken(false);
    commit("clearToken");
    Cookies.remove("token");
  },
  async createUser({ commit }, formData) {
    try {
      await this.$axios.$post("/api/auth/admin/createUser", formData);
    } catch (error) {
      commit("setError", error, { root: true });
    }
  },
  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;

    const cookies = Cookie.parse(cookieStr || "") || {};
    const token = cookies["token"];

    if (isJWTValid(token)) {
      dispatch("setToken", token);
    } else {
      dispatch("logout");
    }
  }
};

export const getters = {
  isAuthenticated: state => !!state.token,
  token: state => state.token
};

const isJWTValid = token => {
  if (!token) return false;

  const jwtData = jwtDecode(token) || {};
  const expires = jwtData.exp || 0;
  return new Date().getTime() / 1000 < expires;
};
