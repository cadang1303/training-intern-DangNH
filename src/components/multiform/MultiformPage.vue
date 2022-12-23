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
      formData: [],
      form: {},
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
    formName() {
      return this.multiForm.find((item) => item.step === this.currentStep).name;
    },
    getFormData() {
      return JSON.parse(
        JSON.stringify(
          this.multiForm.find((item) => item.step === this.currentStep).data
        )
      );
    },
  },
  mounted() {
    if (this.isFirstForm && this.firstForm.length > 0) {
      this.mutationForm(this.multiForm, this.firstForm, this.currentStep);
    }
    this.formData = this.getFormData;
  },
  watch: {
    currentStep: {
      handler() {
        this.formData = this.getFormData;
        if (this.isFirstForm && this.firstForm.length > 0) {
          this.formData = this.firstForm;
        } else if (this.isSecondForm && this.secondForm.length > 0) {
          this.formData = this.secondForm;
        } else if (this.isThirdForm && this.thirdForm.length > 0) {
          this.formData = this.thirdForm;
        }
      },
    },
  },
  methods: {
    ...mapActions({
      saveForm: "form/saveForm",
    }),
    mutationForm(multiForm, formData, stepNum) {
      let fileValue = formData.find((item) => item.name === "img").value;
      multiForm.forEach((item) => {
        if (item.step === stepNum) {
          item.data = JSON.parse(JSON.stringify(formData));
          item.data.find((child) => {
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
          i.value = data;
        }
      });
    },
    onRemoveImage(file) {
      this.formData.forEach((i) => {
        if (i.name === "img") {
          i.value = i.value.filter((f) => f.name != file.name);
        }
      });
    },
    onInput(value, index) {
      if (this.formData[index].name === "salary") {
        this.formData[index].value = value.replace(/^0+/, "");
      } else {
        this.formData[index].value = value;
      }
      this.formData[index].msg = "";
    },
    onChangeCompanyForm(value, indexChild, index) {
      this.formData[index].fields[indexChild].value = value;
      this.formData[index].fields[indexChild].msg = "";
    },
    onSelectJob(option) {
      this.formData.forEach((i) => {
        if (i.name === "jobs") {
          let value = i.value.filter((c) => c.name === option.name);
          if (value.length <= 0) {
            i.value.push(option);
            i.list.map((opt) => {
              opt.isSelected = opt.name === option.name;
            });
          }
        }
      });
    },
    onRemoveJob(option) {
      this.formData.forEach((i) => {
        if (i.name === "jobs") {
          i.value = i.value.filter((c) => c.name != option.name);
          i.list.map((opt) => {
            opt.isSelected = opt.name === option.name;
          });
        }
      });
    },
    toFormJSON(formData) {
      let obj = {};
      let arr = [];
      let data = {};

      for (let i = 0; i < formData.length; i++) {
        if (formData[i].fields) {
          formData[i].fields.forEach((c) => {
            obj[c.name] = c.value;
          });
          arr.push(obj);
          this.form[formData[i].type] = {};
          if (i === arr.length - 1) {
            for (let j = 0; j < arr.length; j++) {
              this.form[formData[i].type][j] = arr[j];
            }
          }
        } else if (Array.isArray(formData[i].value)) {
          if (formData[i].value.length > 0) {
            for (let j = 0; j < formData[i].value.length; j++) {
              data[j] = formData[i].value[j];
            }
            this.form[formData[i].name] = data;
          } else this.form[formData[i].name] = {};
        } else this.form[formData[i].name] = formData[i].value;
      }
    },
    submitForm() {
      this.saveForm({
        formData: this.formData,
        formName: this.formName,
        step: this.currentStep,
      });
      this.toFormJSON(this.formData);
      if (this.isLastForm) {
        console.log(this.form);
        this.$router.push("/");
      } else this.currentStep++;
    },
    changeForm(step) {
      if (step < this.multiForm.length) {
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
