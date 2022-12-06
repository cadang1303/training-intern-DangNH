<template>
  <div class="form-group" :class="{ required: required }">
    <label class="control-label" :for="name">{{ inputLabel }}</label>
    <DatePicker
      class="control-date"
      :class="{ 'form-error': msg }"
      :value="value"
      :name="name"
      type="date"
      :disabled-date="notAfterToday"
      :placeholder="placeholder"
      format="YYYY/MM/DD"
      @input="handleInput"
    ></DatePicker>
    <span v-if="msg" class="msg-text">
      {{ msg }}
    </span>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

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
      type: Date,
      required: false,
    },
    msg: {
      type: String,
      default: () => "",
    },
  },
  components: {
    DatePicker,
  },
  methods: {
    notAfterToday(date) {
      const today = new Date();
      return date.getTime() > today.getTime();
    },
    handleInput(e) {
      this.$emit("onInput", e.target.value);
    },
  },
};
</script>

<style></style>
