<template>
  <div class="form-group" :class="{ required: required }">
    <label class="control-label" :for="name">{{ inputLabel }}</label>
    <textarea
      class="form-control"
      :class="{ 'form-error': msg }"
      :maxlength="maxLength"
      @input="handleInput"
    ></textarea>
    <div
      v-if="!msg && onCounter"
      class="counter"
      :class="{ 'counter-max': count === maxLength }"
    >
      {{ count }}/{{ maxLength }}
    </div>
    <span v-else class="msg-text">
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
      type: Date,
      required: false,
    },
    maxLength: {
      type: Number,
      required: false,
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

<style></style>
