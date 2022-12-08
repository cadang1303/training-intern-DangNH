<template>
  <div class="form-group" :class="{ required: required }">
    <label class="control-label" :for="name">{{ inputLabel }}</label>
    <select
      class="form-control"
      :id="name"
      :name="name"
      :value="value"
      :class="{ 'form-error': msg }"
      @input="handleInput"
    >
      <option selected hidden>{{ placeholder }}</option>
      <option v-for="item in list" :key="item.code" :value="item.name">
        <span v-if="item.name.includes('Tỉnh')">
          {{ item.name.replace("Tỉnh", "") }}
        </span>
        <span v-else-if="item.name.includes('Thành phố')">
          {{ item.name.replace("Thành phố  ", "") }}</span
        >
        <span v-else>{{ item.name }}</span>
      </option>
    </select>
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
      required: false,
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
  methods: {
    handleInput(e) {
      this.$emit("update:value", e.target.value);
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
  width: 528px;
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
</style>
