import axios from "axios";

export default {
  namespaced: true,
  state: {
    cities: [],
    selectedCities: [],
  },
  getters: {
    cities: (state) => state.cities,
    selectedCities: (state) => state.selectedCities,
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
  },
};
