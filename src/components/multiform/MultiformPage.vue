<template>
  <div class="container">
    <h3 class="page-title">Đơn ứng tuyển</h3>
    <StepperComponent :currentStep="currentStep" :steps="STEPS" />
    <FormView
      :formData="formData"
      :currentStep="currentStep"
      @onAddCompany="onAddCompany"
      @onRemoveCompany="onRemoveCompany"
      @onRemoveImage="onRemoveImage"
      @onSelectJob="onSelectJob"
      @onRemoveJob="onRemoveJob"
      @onInput="onInput"
      @onInputImg="onInputImg"
      @onChangeCompanyForm="onChangeCompanyForm"
      @submitForm="submitForm"
      @changeForm="changeForm"
    />
  </div>
</template>

<script>
import { multiForm, formSecondStep } from "@/data/form";
import { mapActions, mapGetters } from "vuex";
import { STEPS } from "@/data/data";
import FormView from "./FormView";
import StepperComponent from "./StepperComponent";
export default {
  components: {
    FormView,
    StepperComponent,
  },
  data() {
    return {
      currentStep: 1,
      STEPS,
      multiForm,
    };
  },
  computed: {
    ...mapGetters({
      firstForm: "form/getFirstForm",
      secondForm: "form/getSecondForm",
      thirdForm: "form/getThirdForm",
    }),
    isFirstForm() {
      return this.currentStep === 1;
    },
    isSecondForm() {
      return this.currentStep === 2;
    },
    isThirdForm() {
      return this.currentStep === 3;
    },
    isLastForm() {
      return this.currentStep === this.multiForm.length;
    },
    formData() {
      const rs = this.multiForm.filter(
        (item) => item.step === this.currentStep
      )[0];
      return rs?.data;
    },
  },
  mounted() {
    if (this.isFirstForm && this.firstForm.length > 0) {
      this.mutationForm(this.multiForm, this.firstForm, this.currentStep);
    }
  },
  watch: {
    currentStep: {
      handler(value) {
        if (this.isFirstForm && this.firstForm.length > 0) {
          this.mutationForm(this.multiForm, this.firstForm, value);
        } else if (this.isSecondForm && this.secondForm.length > 0) {
          this.multiForm.forEach((item) => {
            if (item.step === value) {
              item.data = JSON.parse(JSON.stringify(this.secondForm));
            }
          });
        } else if (this.isThirdForm && this.thirdForm.length > 0) {
          this.multiForm.forEach((item) => {
            if (item.step === value) {
              item.data = JSON.parse(JSON.stringify(this.thirdForm));
            }
          });
        }
      },
    },
  },
  methods: {
    ...mapActions({
      saveForm: "form/saveForm",
    }),
    mutationForm(multiForm, formData, stepNum) {
      let fileValue = formData.filter((item) => item.name === "img")[0].value;
      multiForm.forEach((item) => {
        if (item.step === stepNum) {
          item.data = JSON.parse(JSON.stringify(formData));
          item.data.map((child) => {
            if (child.name === "img") {
              child.value = [...fileValue];
            }
          });
        }
      });
    },
    onAddCompany() {
      this.formData.push(JSON.parse(JSON.stringify(formSecondStep)));
    },
    onRemoveCompany(index) {
      this.formData.splice(index, 1);
    },
    onInputImg(data) {
      this.formData.forEach((i) => {
        if (i.name === "img") {
          i.value = i.value.concat(data);
        }
      });
    },
    onRemoveImage(index) {
      this.formData.forEach((i) => {
        if (i.name === "img") {
          i.value.splice(index, 1);
        }
      });
    },
    onInput(value, index) {
      this.formData[index].value = value;
      this.formData[index].msg = "";
    },
    onChangeCompanyForm(value, indexChild, index) {
      this.formData[index].fields[indexChild].value = value;
      this.formData[index].fields[indexChild].msg = "";
    },
    onSelectJob(option) {
      this.formData.forEach((i) => {
        if (i.name === "job") {
          let value = i.value.filter((c) => c.name === option.name);
          if (value.length <= 0) {
            i.value.push(option);
            i.list.map((opt) => {
              if (opt.name === option.name) {
                opt.isSelected = true;
              }
            });
          }
        }
      });
    },
    onRemoveJob(option) {
      this.formData.forEach((i) => {
        if (i.name === "job") {
          i.value.splice(i.value.indexOf(option), 1);
          i.list.map((opt) => {
            if (opt.name === option.name) {
              opt.isSelected = false;
            }
          });
        }
      });
    },
    toFormJSON() {
      let form = {};
      this.firstForm.forEach((item) => {
        form[item.name] = item.value;
      });

      form["companies"] = {};
      let data = [];
      let value = {};

      this.secondForm.forEach((item) => {
        item.fields.forEach((c) => {
          value[c.name] = c.value;
        });
        data.push(value);
      });

      for (let i = 0; i < data.length; i++) {
        form["companies"][i] = data[i];
      }

      this.thirdForm.forEach((item) => {
        form[item.name] = item.value;
      });

      return form;
    },
    submitForm() {
      this.saveForm({ formData: this.formData, step: this.currentStep });
      if (this.isLastForm) {
        console.log(this.toFormJSON());
        this.$router.push("/");
      } else this.currentStep++;
    },
    changeForm(step) {
      if (!this.isLastForm) {
        this.currentStep = step;
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
</style>
