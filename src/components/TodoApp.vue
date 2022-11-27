<template>
  <div class="todo-page">
    <h1>Todo</h1>
    <div class="search-wrapper">
      <i class="fa fa-search icon"></i>
      <input
        type="text"
        v-model="keyword"
        placeholder="Nhập từ khóa tìm kiếm nhiệm vụ"
      />
    </div>
    <div class="todo-list">
      <TodoColumn
        class="col"
        v-for="col in todoCols"
        :key="col.status"
        :col="col"
        :todos="getTodosByStatus(col.status)"
        @onAddNewItem="onAddNewItem"
        @onChangeStatus="onChangeStatus"
      />
    </div>
  </div>
</template>

<script>
import TodoColumn from "./todo/TodoColumn";
// import AutoComplete from "./AutoComplete";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TodoColumn,
    // AutoComplete,
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapGetters("todo", ["todoCols", "todoList"]),
    getTodosByStatus() {
      return (status) => {
        return this.todoList.filter(
          (item) => item.status === status && item.name.includes(this.keyword)
        );
      };
    },
  },
  methods: {
    ...mapActions("todo", ["onAddNewItem", "onChangeStatus"]),
  },
};
</script>

<style scoped>
.todo-page h1 {
  margin-bottom: 24px;
}
.todo-page .search-wrapper {
  margin-bottom: 32px;
}
.search-wrapper input {
  min-width: 300px;
  padding: 0 8px;
  height: 40px;
  margin-right: 16px;
  border-radius: 4px;
  outline: 0;
  border: 1px solid #dcdcdc;
  text-align: center;
}
.search-wrapper i {
  position: absolute;
}
.search-wrapper .icon {
  padding: 10px;
  min-width: 40px;
}
/* .search-wrapper button {
  height: 40px;
  padding: 0 12px;
  color: #fff;
  font-weight: bold;
  background: #27ae60;
  border-radius: 4px;
  outline: 0;
  border: 0;
  cursor: pointer;
} */
.todo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.todo-list .col {
  width: calc(33.3333333333333% - 16px);
}
</style>
