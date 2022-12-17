<template>
  <div class="stepper-container">
    <ul class="progressbar">
      <li
        v-for="step in steps"
        :key="step.id"
        :class="{ active: step.id <= currentStep }"
      >
        <p class="stepper-label">{{ step.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    steps: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.stepper-container {
  width: 100%;
  margin-bottom: 30px;
}
.stepper-label {
  color: #333333;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}
.progressbar {
  counter-reset: step;
  margin: 10px;
}
.progressbar li {
  list-style-type: none;
  float: left;
  width: 13%;
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
}
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  height: 32px;
  width: 32px;
  line-height: 32px;
  border: 1px solid #dbdbdb;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  border-radius: 98px;
  background-color: #dbdbdb;
  color: #ffffff;
}
.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #dbdbdb;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active {
  color: #ffffff;
}
.progressbar li.active:before {
  background-color: #617d98;
}
.progressbar li.active + li:after {
  background-color: #dbdbdb;
}
</style>
