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
export default {};
</script>

<style></style>
