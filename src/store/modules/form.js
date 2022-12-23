export default {
  namespaced: true,
  state: {
    firstForm: [],
    secondForm: [],
    thirdForm: [],
  },
  getters: {
    getFirstForm: (state) => state.firstForm,
    getSecondForm: (state) => state.secondForm,
    getThirdForm: (state) => state.thirdForm,
  },
  mutations: {
    SAVE_FORM(state, payload) {
      state[payload.formName] = payload.formData;
    },
  },
  actions: {
    saveForm({ commit, dispatch }, data) {
      commit("SAVE_FORM", data);
      if (data.isLastForm) {
        dispatch(
          "notifications/addNotification",
          {
            type: "success",
            message: "Gửi lên thành công!",
          },
          { root: true }
        );
      }
    },
  },
};
