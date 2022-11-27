<template>
  <div class="todo-col">
    <h3>{{ col.label }}</h3>
    <div class="todos">
      <TodoItem
        :addMode="true"
        :todo="todoAdd"
        v-if="showAddMode"
        @onCancel="onCancel"
        @onAddNewItem="onAddNewItem"
      />
      <div class="todos-list" v-if="todos.length">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @onChangeStatus="onChangeStatus"
        />
      </div>
      <ButtonComponent
        class="btn-add"
        :disabled="showAddMode"
        v-if="col.status === 1"
        :btnLabel="'Thêm'"
        @onClick="addNewItem"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import ButtonComponent from "@/components/base/ButtonComponent.vue";
import { formatDate } from "@/utils/time";
export default {
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
    col: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    TodoItem,
    ButtonComponent,
  },
  data() {
    return {
      todoAdd: {
        name: "",
        createdAt: formatDate(new Date()),
        status: 1,
      },
      showAddMode: false,
    };
  },
  methods: {
    addNewItem() {
      if (!this.showAddMode) this.showAddMode = true;
    },
    onCancel() {
      this.todoAdd.name = "";
      this.showAddMode = false;
    },
    onAddNewItem(name) {
      this.todoAdd.name = name;
      this.$emit("onAddNewItem", this.todoAdd);
      this.onCancel();
    },
    onChangeStatus(data) {
      this.$emit("onChangeStatus", data);
    },
  },
};
</script>

<style scoped>
.todo-col h3 {
  margin-bottom: 16px;
}
.todos {
  min-height: calc(100vh - 211px);
  background: #f0f0f0;
  border-radius: 4px;
  padding: 12px;
  position: relative;
}
.todos-list {
  max-height: calc(100vh - 256px);
  padding-bottom: 72px;
  overflow: auto;
}
.todos-list ::-webkit-scrollbar {
  width: 8px;
  cursor: default;
}
.todos-list::-webkit-scrollbar-track {
  background: transparent;
}
.todos-list ::-webkit-scrollbar-thumb {
  background: #dcdcdc;
  border-radius: 12px;
}
.btn-add {
  width: calc(100% - 24px);
  border: 1px solid #27ae60;
  color: #27ae60;
  border-radius: 4px;
  font-weight: bold;
  background: #ffffff7e;
  height: 32px;
  position: absolute;
  bottom: 12px;
  left: 12px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.55;
  cursor: default;
}
</style>
