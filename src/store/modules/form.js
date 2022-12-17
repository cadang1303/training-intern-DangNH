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
      if (payload.step === 1) {
        state.firstForm = payload.formData;
      } else if (payload.step === 2) {
        state.secondForm = payload.formData;
      } else if (payload.step === 3) {
        state.thirdForm = payload.formData;
      }
    },
  },
  actions: {
    saveForm({ commit }, data) {
      commit("SAVE_FORM", data);
    },
  },
};
