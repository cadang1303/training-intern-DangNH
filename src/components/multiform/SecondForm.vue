<template>
  <div class="container">
    <form @input="onChange" @submit.prevent>
      <div class="form-container" v-for="item in companyList" :key="item.id">
        <div class="form-title">
          <select class="form-control" @change="onInputCompany(item)">
            <option v-for="c in companies" :key="c.id" :value="c.name">
              {{ c.name }}
            </option></select
          >>
          <img
            src="@/assets/icon/interfaces/Trash.png"
            class="btn-remove"
            @click="onRemoveCompany(item)"
          />
        </div>
        <InputField
          :required="true"
          inputLabel="Vị trí từng làm"
          name="jobName"
          :msg="item.msg.jobName"
          :value.sync="item.jobName"
          @onInput="onInputJobName(item)"
        />
        <DatepickerForm
          :required="true"
          inputLabel="Thời gian làm việc"
          placeholder="0000/00/00"
          name="startDate"
          :value.sync="item.startDate"
          :msg="item.msg.jobDate"
          @onInput="onInputStartDate(item)"
        >
          &nbsp; - &nbsp;
          <input
            type="date"
            :class="{ 'form-error': item.msg.jobDate }"
            class="control-date"
            v-model="item.endDate"
            name="endDate"
            placeholder="0000/00/00"
            format="YYYY/MM/DD"
        /></DatepickerForm>
        <TextareaInput
          inputLabel="Mô tả về công việc"
          :maxLength="5000"
          :value.sync="item.jobDesc"
          :msg="item.msg.jobDesc"
          :required="true"
          @onInput="onInputJobDesc"
        />
      </div>
      <span v-if="msg.companyList" class="msg-text">
        {{ msg.companyList }}
      </span>
      <ButtonComponent
        :btnLabel="'+ Thêm công ty'"
        class="btn-add"
        @onClick="onAddNewCompany"
      />
    </form>
  </div>
</template>

<script>
import ButtonComponent from "@/components/base/ButtonComponent";
import InputField from "./inputform/InputField";
import DatepickerForm from "./inputform/DatepickerForm.vue";
import {
  validateCompanyList,
  validateJobName,
  validateJobDesc,
  validateJobDate,
  validateCompany,
} from "@/utils/input";
import TextareaInput from "./inputform/TextareaInput";

export default {
  components: {
    ButtonComponent,
    DatepickerForm,
    InputField,
    TextareaInput,
  },
  data() {
    return {
      companyList: [
        {
          id: 1,
          company: "",
          jobName: "",
          jobDesc: "",
          startDate: "",
          endDate: "",
          msg: {},
        },
      ],
      companies: [
        { id: 1, name: "MOR 1" },
        { id: 2, name: "MOR 2" },
        { id: 3, name: "MOR 3" },
        { id: 4, name: "MOR 4" },
        { id: 5, name: "MOR 5" },
      ],
      error: false,
      msg: {},
    };
  },
  methods: {
    onAddNewCompany() {
      this.companyList.push({
        id: Math.random() * 999999,
        company: "",
        jobName: "",
        jobDesc: "",
        startDate: "",
        endDate: "",
        msg: {},
      });
      this.$store.dispatch("form/onSetCompany", this.companyList);
    },
    onInputCompany(i) {
      i.msg.company = validateCompany(i.company, this.companyList);
    },
    onInputStartDate(i) {
      i.msg.jobDate = validateJobDate(i.startDate, i.endDate, this.companyList);
    },
    onInputJobName(i) {
      i.msg.jobName = validateJobName(i.jobName);
    },
    onInputJobDesc(i) {
      i.msg.jobDesc = validateJobDesc(i.jobDesc);
    },
    onRemoveCompany(i) {
      this.companyList.splice(this.companyList.indexOf(i), 1);
    },
    onChange() {
      this.msg.companyList = validateCompanyList(this.companyList);
      for (let i = 0; i < this.companyList.length; i++) {
        if (
          this.companyList[i].msg.jobDate ||
          this.companyList[i].msg.jobName ||
          this.companyList[i].msg.jobDesc
        ) {
          this.error = true;
        } else this.error = false;
      }
      if (!this.msg.companyList) {
        this.error = false;
      } else this.error = true;
      if (!this.error) {
        this.$store.dispatch("form/onSetStatusForm", this.error);
        this.$store.dispatch("form/onSetCompany", this.companyList);
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
  width: 1026px;
  padding: 20px 32px 24px;
  margin-bottom: 28px;
  gap: 10px;
}
.form-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  width: 978px;
  height: 60px;
  background: #f8f8f8;
  border-radius: 4px;
}
.form-title .form-control {
  width: 898px;
  height: 40px;
  padding: 8px 10px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
  border-radius: 4px;
}
.form-title .form-control option {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
}
.btn-remove {
  width: 32px;
  height: 32px;
  margin: auto;
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
.form-group.required .control-label:before {
  content: "Must";
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  border-radius: 3px;
  padding: 0 8px;
  margin-right: 8px;
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
.form-group textarea {
  padding: 8px 10px;
  width: 528px;
  height: 152px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  resize: none;
}
.control-date {
  padding: 8px 10px;
  width: 122px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  font-family: "Noto Sans JP";
}
.msg-text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #ed5d5d;
}
.btn-add {
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
</style>
