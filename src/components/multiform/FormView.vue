<template>
  <div class="main">
    <div :class="{ 'form-container': !isSecondForm }">
      <InputForm
        v-for="(item, index) in formData"
        :key="item.name"
        :item="item"
        :value="item.value"
        @onSelectJob="onSelectJob"
        @onRemoveJob="onRemoveJob"
        @onRemoveCompany="onRemoveCompany(index)"
        @onInput="(value) => onInput(value, index)"
        @onInputImg="onInputImg"
        @onRemoveImages="onRemoveImage"
        @onChangeCompanyForm="
          (value, indexChild) => onChangeCompanyForm(value, indexChild, index)
        "
      />

      <div class="btn-add" @click="onAddCompany" v-if="isSecondForm">
        <img src="@/assets/icon/interfaces/Plus.png" class="btn-plus-symbol" />
        Thêm công ty
      </div>

      <div class="footer-btn">
        <ButtonComponent
          class="btn btn-cont"
          @onClick="goNext"
          :btnLabel="getSubmitBtn"
        />
        <ButtonComponent
          v-if="!isFirstForm"
          btnLabel="Quay lại"
          class="btn btn-back"
          @onClick="goBack"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { multiForm } from "@/data/form";
import InputForm from "./InputForm";
import ButtonComponent from "@/components/base/ButtonComponent";
import {
  validateDateRange,
  validateDate,
  validateDigit,
  validateLength,
  validateRequired,
} from "@/utils/validateForm";

export default {
  props: {
    formData: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
    },
  },
  data() {
    return {
      isValid: false,
      multiForm,
    };
  },
  computed: {
    isFirstForm() {
      return this.currentStep === 1;
    },
    isSecondForm() {
      return this.currentStep === 2;
    },
    isLastForm() {
      return this.currentStep === this.multiForm.length;
    },
    getSubmitBtn() {
      return this.isLastForm ? "Hoàn thành" : "Tiếp";
    },
    error() {
      return this.$el.getElementsByClassName("msg-text").length;
    },
  },
  watch: {
    currentStep: {
      handler() {
        this.isValid = false;
      },
    },
  },
  methods: {
    onInput(value, index) {
      this.$emit("onInput", value, index);
    },
    onInputImg(value) {
      this.$emit("onInputImg", value);
    },
    onRemoveImage(file) {
      this.$emit("onRemoveImage", file);
    },
    onSelectJob(item) {
      this.$emit("onSelectJob", item);
    },
    onRemoveJob(item) {
      this.$emit("onRemoveJob", item);
    },
    onAddCompany() {
      this.$emit("onAddCompany");
    },
    onRemoveCompany(index) {
      this.$emit("onRemoveCompany", index);
    },
    onChangeCompanyForm(value, indexChild, index) {
      this.$emit("onChangeCompanyForm", value, indexChild, index);
    },
    goBack() {
      this.$emit("changeForm", this.currentStep - 1);
    },
    goNext() {
      this.validate();
      let msgText = null;
      if (!this.isSecondForm) {
        msgText = this.formData.filter((item) => item.msg);
      } else {
        this.formData.forEach(
          (item) => (msgText = item.fields.filter((i) => i.msg))
        );
      }

      if (!msgText.length) {
        this.isValid = true;
      } else this.isValid = false;

      if (this.isValid) {
        this.$emit("submitForm", this.formData);
        this.$emit("changeForm", this.currentStep + 1);
      } else {
        setTimeout(() => {
          let el = document.getElementsByClassName("msg-text")[0].offsetTop;
          window.scrollTo({
            top: el - 300,
            behavior: "smooth",
          });
        }, 200);
      }
    },
    validate() {
      if (!this.isSecondForm) {
        this.formData.forEach((item) => {
          if (item.validation.required) {
            validateRequired(item);
          }
          if (item.validation.maxLength) {
            validateLength(item);
          }
          if (item.type === "date") {
            validateDate(item);
          }
          if (item.type === "salary") {
            validateDigit(item);
          }
        });
      } else {
        for (let i = 0; i < this.formData.length; i++) {
          for (let j = 0; j < this.formData[i].fields.length; j++) {
            if (this.formData[i].fields[j].validation.required) {
              validateRequired(this.formData[i].fields[j]);
            }
            if (this.formData[i].fields[j].validation.maxLength) {
              validateLength(this.formData[i].fields[j]);
            }
            if (this.formData[i].fields[j].type === "daterange") {
              validateDateRange(this.formData, i);
            }
          }
        }
      }
    },
  },
  components: {
    InputForm,
    ButtonComponent,
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  width: 926px;
  padding: 20px 32px 24px;
  gap: 10px;
}
.footer-btn {
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: 24px;
}
.footer-btn > button {
  margin-right: 26px;
}
.btn-add {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  width: 151px;
  height: 40px;
  padding: 4px 8px;
  color: #48647f;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  margin-top: 24px;
  cursor: pointer;
}
.btn-plus-symbol {
  width: 20px;
  height: 20px;
}
.btn:disabled {
  background: #dcdcdc;
  border: 1px solid #dcdcdc;
  cursor: default;
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
  cursor: pointer;
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
  cursor: pointer;
}
</style>
