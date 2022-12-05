<template>
  <div class="container">
    <h3 class="page-title">Đơn ứng tuyển</h3>
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
    <keep-alive><component :is="component" /></keep-alive>
    <div class="footer-btn">
      <ButtonComponent
        class="btn btn-cont"
        @onClick="goNext"
        :disabled="error"
        :btnLabel="getSubmitBtn"
      />
      <ButtonComponent
        v-if="currentStep > 1 && currentStep < 3"
        :btnLabel="'Quay lại'"
        class="btn btn-back"
        @onClick="goBack"
      />
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components//base/ButtonComponent";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";

export default {
  components: {
    ButtonComponent,
    FirstForm,
    SecondForm,
    ThirdForm,
  },
  data() {
    return {
      currentStep: 1,
      steps: [
        { id: 1, label: "Thông tin cá nhân" },
        { id: 2, label: "Kinh nghiệm làm việc" },
        { id: 3, label: "Xác nhận thông tin" },
      ],
      component: FirstForm,
    };
  },
  computed: {
    error() {
      return this.$store.getters["form/error"]
    },  
    getSubmitBtn() {
      return this.currentStep === 3 ? "Hoàn thành" : "Tiếp";
    },
  },
  methods: {
    goNext() {
      if (this.component === FirstForm) {
        this.component = SecondForm;
        this.currentStep = 2;
      } else if (this.component === SecondForm) {
        this.component = ThirdForm;
        this.currentStep = 3;
      }
    },
    goBack() {
      if (this.component === ThirdForm) {
        this.component = SecondForm;
        this.currentStep = 2;
      } else if (this.component === SecondForm) {
        this.component = FirstForm;
        this.currentStep = 1;
      }
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Noto Sans JP";
  font-style: normal;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.page-title {
  color: #333333;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
}
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
.footer-btn {
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: 24px;
}
.footer-btn > button {
  margin-right: 26px;
}
.btn:disabled {
  background: #dcdcdc;
  border: 1px solid #dcdcdc;
}
.btn-cont {
  min-width: 102px;
  height: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  line-height: 24px;
  background: #627d98;
  border: 1px solid #627d98;
  border-radius: 3px;
}
.btn-back {
  width: 102px;
  height: 40px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #666666;
  line-height: 24px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
}
</style>
