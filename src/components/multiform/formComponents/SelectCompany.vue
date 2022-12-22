<template>
  <div class="form-select">
    <div class="form-title">
      <select
        class="form-control"
        :id="name"
        :name="name"
        v-model="valueInput"
        :class="{ 'form-error': msg }"
        @change="handleInput"
      >
        <option selected hidden>{{ placeholder }}</option>
        <option v-for="item in list" :key="item.id" :value="item.name">
          {{ item.name }}
        </option>
      </select>
      <img
        src="@/assets/icon/interfaces/Trash.png"
        class="btn-remove"
        @click="onRemove"
      />
    </div>
    <span v-if="msg" class="msg-text">
      {{ msg }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: () => false,
    },
    inputLabel: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      default: () => "",
    },
    list: {
      type: Array,
      required: false,
    },
    msg: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      valueInput: "",
    };
  },
  watch: {
    value: {
      handler(value) {
        this.valueInput = value;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleInput() {
      this.$emit("onInput", this.valueInput);
    },
    onRemove() {
      this.$emit("onRemove");
    },
  },
};
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}
.control-label {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  margin-bottom: 6px;
}
.form-group.required .control-label:before {
  content: "Must";
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  border-radius: 3px;
  padding: 0 8px;
  margin-right: 8px;
  width: 45px;
  height: 20px;
  background: #627d98;
}
.form-control {
  padding: 8px 10px;
  width: 898px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
.form-control:hover {
  border: 1px solid #1991d2;
}
.form-error {
  border: 1px solid #ed5d5d;
}
.form-error:hover {
  border: 1px solid #ed5d5d;
}
.form-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  width: 978px;
  height: 60px;
  background: #f8f8f8;
  border-radius: 4px;
}
.form-title .form-control {
  width: 95%;
  height: 40px;
  padding: 8px 10px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
  border-radius: 4px;
}
.form-title .form-control option {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
}
.btn-remove {
  width: 32px;
  height: 32px;
  margin: auto;
  cursor: pointer;
}
.msg-text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #ed5d5d;
}
</style>
