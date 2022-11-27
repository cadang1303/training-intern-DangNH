import Vue from "vue";
import Vuex from "vuex";

import todo from "./modules/todo";
import city from "./modules/city";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    todo,
    city,
  },
});
