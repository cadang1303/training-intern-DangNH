import axios from "axios";

export default {
  namespaced: true,
  state: {
    error: false,
    cityList: [],
    info: {
      profile: {
        name: "",
        dob: "",
        desc: "",
        city: "",
        positions: [],
        images: [],
      },
      companyList: [
        {
          id: 1,
          company: "",
          jobName: "",
          jobDesc: "",
          startDate: "",
          endDate: "",
        },
      ],
      confirmForm: {
        reason: "",
        salary: 0,
      },
    },
  },
  getters: {
    cityList: (state) => state.cityList,
    profile: (state) => state.info.profile,
    companyList: (state) => state.info.companyList,
    confirmForm: (state) => state.info.confirmForm,
    error: (state) => state.error,
  },
  mutations: {
    SET_CITY_LIST(state, data) {
      state.cityList = data;
    },
    SET_PROFILE(state, profile) {
      state.info.profile = profile;
    },
    SET_COMPANY_LIST(state, list) {
      state.info.companyList = list;
    },
    SET_CONFIRM_FORM(state, form) {
      state.info.confirmForm = form;
    },
    SET_STATUS_FORM(state, boolean) {
      state.error = boolean;
    },
  },
  actions: {
    async loadCityList({ commit }) {
      const res = await axios.get("https://provinces.open-api.vn/api/p/");
      commit("SET_CITY_LIST", res.data);
    },
    onSetStatusForm({ commit }, boolean) {
      commit("SET_STATUS_FORM", boolean);
    },
    onSetProfile({ commit }, profile) {
      commit("SET_PROFILE", profile);
    },
    onSetCompany({ commit }, list) {
      commit("SET_COMPANY_LIST", list);
    },
    onSetConfirm({ commit }, form) {
      commit("SET_CONFIRM_FORM", form);
    },
  },
};
