<template>
  <div class="form-container">
    <form @change="onChange" @submit.prevent>
      <div class="form-group required">
        <label class="control-label" for="reason">
          Lý do muốn ứng tuyển vào công ty
        </label>
        <textarea
          :class="{ 'form-error': msg.reason }"
          class="form-control-textarea"
          name="reason"
          v-model="confirmForm.reason"
          maxlength="1000"
          required
        ></textarea>
        <div
          v-if="!msg.reason"
          class="counter"
          :class="{ 'counter-max': count === 1000 }"
        >
          {{ count }}/1000
        </div>
        <span v-else class="msg-text">
          {{ msg.reason }}
        </span>
      </div>
      <div class="form-group required">
        <label class="control-label" for="salary">Mức lương mong muốn</label>
        <div class="form-salary" :class="{ 'form-salary-error': msg.salary }">
          <input
            class="form-salary-control"
            type="text"
            v-model="confirmForm.salary"
            name="salary"
            required
          />
          <span class="currency">VNĐ</span>
        </div>

        <span v-if="msg.salary" class="msg-text">
          {{ msg.salary }}
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { validateReason, validateSalary } from "@/utils/input";

export default {
  data() {
    return {
      count: 0,
      confirmForm: {
        reason: "",
        salary: null,
      },
      msg: [],
      error: false,
    };
  },
  watch: {
    "confirmForm.reason"(value) {
      this.confirmForm.reason = value;
      this.count = this.confirmForm.reason.length;
      this.msg.reason = validateReason(this.confirmForm.reason);
    },
    "confirmForm.salary"(value) {
      this.confirmForm.salary = value;
      this.msg.salary = validateSalary(this.confirmForm.salary);
    },
  },
  methods: {
    onChange() {
      if (!this.msg.length) {
        this.error = false;
        this.$store.dispatch("form/onSetStatusForm", this.error);
        this.$store.dispatch("form/onSetConfirm", this.confirmForm);
      } else {
        this.error = true;
        this.$store.dispatch("form/onSetStatusForm", this.error);
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
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}
.control-label {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  margin-bottom: 6px;
}
.required .control-label:before {
  content: "Must";
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  border-radius: 3px;
  padding: 0 8px;
  margin-right: 8px;
  gap: 10px;
  width: 45px;
  height: 20px;
  background: #627d98;
}
.form-group small {
  font-weight: 400;
  font-size: 12px;
  color: #666666;
  margin: 4px;
}
.form-control {
  padding: 8px 10px;
  gap: 10px;
  width: 528px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
.form-control:hover {
  border: 1px solid #1991d2;
}
.form-error {
  border: 1px solid #ed5d5d;
}
.form-error:hover {
  border: 1px solid #ed5d5d;
}
.form-control-textarea {
  padding: 8px 10px;
  gap: 10px;
  width: 528px;
  height: 152px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  resize: none;
}
.form-control-textarea:hover {
  border: 1px solid #1991d2;
}
.form-textarea-error {
  border: 1px solid #ed5d5d;
}
.form-textarea-error:hover {
  border: 1px solid #ed5d5d;
}
.form-salary {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px;
  width: 120px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
}
.form-salary:hover {
  border: 1px solid #1991d2;
}
.form-salary-error {
  border: 1px solid #ed5d5d;
}
.form-salary-error:hover {
  border: 1px solid #ed5d5d;
}
.form-salary-control {
  border: none;
  width: 78px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.currency {
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #333333;
}

.counter {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
  margin: 10px 0;
}
.counter-max {
  color: #ed5d5d;
}
.msg-text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #ed5d5d;
}
</style>
