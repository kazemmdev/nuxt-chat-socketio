import createPersistedState from "vuex-persistedstate";

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: "current",
  })(store);
};
