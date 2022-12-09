<template>
  <div class="form-container">
    <form @input="onChange" @submit.prevent>
      <TextareaInput
        inputLabel="Lý do muốn ứng tuyển vào công ty"
        :required="true"
        :onCounter="true"
        name="reason"
        :maxLength="1000"
        :msg="msg.reason"
        :value.sync="confirmForm.reason"
      />
      <InputField
        name="salary"
        :value.sync="confirmForm.salary"
        :required="true"
        :msg="msg.salary"
        inputLabel="Mức lương mong muốn"
      >
        <span class="currency">VNĐ</span>
      </InputField>
    </form>
  </div>
</template>

<script>
import { validateReason, validateSalary } from "@/utils/input";
import TextareaInput from "./inputform/TextareaInput";
import InputField from "./inputform/InputField.vue";

export default {
  components: {
    TextareaInput,
    InputField,
  },
  data() {
    return {
      count: 0,
      confirmForm: {
        reason: "",
        salary: null,
      },
      msg: {},
      error: false,
    };
  },
  watch: {
    confirmForm: {
      deep: true,
      handler() {
        this.msg.reason = validateReason(this.confirmForm.reason);
        this.msg.salary = validateSalary(this.confirmForm.salary);

        if (this.msg.reason && this.msg.salary) {
          this.error = true;
        } else this.error = false;
      },
    },
  },
  methods: {
    onChange() {
      this.$store.dispatch("form/onSetStatusForm", this.error);
      if (this.error) {
        this.$store.dispatch("form/onSetConfirm", this.confirmForm);
      }
    },
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
.currency {
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #333333;
}
.msg-text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #ed5d5d;
}
</style>
