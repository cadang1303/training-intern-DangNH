import { formatDate } from "@/utils/time";

export default {
  namespaced: true,
  state: {
    todoCols: [
      {
        label: "Mới",
        status: 1,
      },
      {
        label: "Đã hoàn thành",
        status: 2,
      },
      {
        label: "Đã từ bỏ",
        status: 3,
      },
    ],
    todoList: [],
  },
  getters: {
    todoCols: (state) => state.todoCols,
    todoList: (state) => state.todoList,
  },
  mutations: {
    ADD_ITEM(state, data) {
      let id = 1;
      if (state.todoList.length) {
        id = Math.max(...state.todoList.map((c) => c.id)) + 1;
      }
      state.todoList.push({
        id,
        ...data,
      });
    },
    CHANGE_STATUS(state, data) {
      const idx = state.todoList.findIndex((c) => c.id == data.id);
      if (idx != -1) {
        state.todoList[idx].status = data.status;
        state.todoList[idx]["lastModified"] = formatDate(new Date());
      }
    },
  },
  actions: {
    onAddNewItem({ commit }, data) {
      commit("ADD_ITEM", data);
    },
    onChangeStatus({ commit }, data) {
      commit("CHANGE_STATUS", data);
    },
  },
};
