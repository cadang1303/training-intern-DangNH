<template>
  <div class="form-group" :class="{ required: required }">
    <label class="control-label" :for="name">{{ inputLabel }}</label>
    <input
      type="text"
      class="form-control"
      :class="{ 'form-error': msg }"
      :name="name"
      :value="value"
      :maxlength="maxLength"
      @input="handleInput"
    />
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
      default: () => "Label",
    },
    name: {
      type: String,
      default: () => "name",
    },
    value: {
      type: String,
      default: () => "",
    },
    maxLength: {
      type: Number,
      default: () => 100,
    },
    msg: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("onInput", e.target.value);
    },
  },
};
</script>

<style scoped></style>
