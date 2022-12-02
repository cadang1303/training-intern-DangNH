import axios from "axios";

export default {
  namespaced: true,
  state: {
    cities: [],
    selectedCities: [],
    keyword: "",
  },
  getters: {
    cities: (state) => state.cities,
    selectedCities: (state) => state.selectedCities,
    keyword: (state) => state.keyword,
    filterList: (state) => {
      return state.cities.filter(
        (i) =>
          i.name.toLowerCase().includes(state.keyword.toLowerCase()) &&
          state.keyword.length > 0
      );
    },
  },
  mutations: {
    SET_CITY_LIST(state, data) {
      state.cities = data;
    },
    SELECT_CITY(state, city) {
      state.selectedCities.push(city);
      state.cities.splice(state.cities.indexOf(city), 1);
    },
    REMOVE_SELECTED(state, city) {
      state.selectedCities.splice(state.selectedCities.indexOf(city), 1);
      state.cities.push(city);
    },
    INPUT_KEYWORD(state, keyword) {
      state.keyword = keyword;
    },
  },
  actions: {
    async loadCityList({ commit }) {
      const res = await axios.get("https://provinces.open-api.vn/api/p/");
      commit("SET_CITY_LIST", res.data);
    },
    onSelect({ commit }, city) {
      commit("SELECT_CITY", city);
    },
    onCancel({ commit }, city) {
      commit("REMOVE_SELECTED", city);
    },
    onInput({ commit }, keyword) {
      commit("INPUT_KEYWORD", keyword);
    },
  },
};
