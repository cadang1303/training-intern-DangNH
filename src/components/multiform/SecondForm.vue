<template>
  <div class="container">
    <form @change="onChange" @submit.prevent>
      <div class="form-container" v-for="item in companyList" :key="item.id">
        <div class="form-title">
          <select
            class="form-control"
            @change="(e) => (item.company = e.target.value)"
          >
            <option v-for="item in companies" :key="item.id" :value="item.name">
              {{ item.name }}
            </option>
          </select>
          <img
            src="@/assets/icon/interfaces/Trash.png"
            class="btn-remove"
            @click="onRemoveCompany(item)"
          />
        </div>
        <div class="form-group required">
          <label class="control-label" for="jobName">Vị trí từng làm</label>
          <input
            :class="{ 'form-error': msg.jobName }"
            class="form-control"
            type="text"
            v-model="item.jobName"
            name="jobName"
            maxlength="100"
          />
          <span v-if="msg.jobName" class="msg-text">
            {{ msg.jobName }}
          </span>
        </div>
        <div class="form-group required">
          <label class="control-label" for="jobTime">Thời gian làm việc</label>
          <div class="jobtime">
            <DatePicker
              class="control-date"
              type="date"
              v-model="item.startDate"
              placeholder="0000/00/00"
              format="YYYY/MM/DD"
              :disabled-date="notAfterToday"
            ></DatePicker>
            -
            <DatePicker
              class="control-date"
              type="date"
              v-model="item.endDate"
              placeholder="0000/00/00"
              format="YYYY/MM/DD"
              :disabled-date="notAfterToday"
            ></DatePicker>
          </div>
          <span v-if="msg.jobDate" class="msg-text">
            {{ msg.jobDate }}
          </span>
        </div>
        <div class="form-group required">
          <label class="control-label" for="jobDesc">
            Mô tả về công việc
          </label>
          <textarea
            :class="{ 'form-error': msg.jobDesc }"
            class="form-control"
            name="jobDesc"
            v-model="item.jobDesc"
            maxlength="5000"
          ></textarea>
          <span v-if="msg.jobDesc" class="msg-text">
            {{ msg.jobDesc }}
          </span>
        </div>
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
// import { uuid } from "uuidv4";
import DatePicker from "vue2-datepicker";
import {
  validateCompanyList,
  validateJobName,
  validateJobDesc,
  validateJobDate,
} from "@/utils/input";

export default {
  components: {
    DatePicker,
    ButtonComponent,
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
      msg: [],
    };
  },
  methods: {
    notAfterToday(date) {
      const today = new Date();
      return date.getTime() > today.getTime();
    },
    onAddNewCompany() {
      this.companyList.push({
        id: Math.random() * 999999,
        company: "",
        jobName: "",
        jobDesc: "",
        startDate: "",
        endDate: "",
      });
      this.$store.dispatch("form/onSetCompany", this.companyList);
    },
    onRemoveCompany(i) {
      this.companyList.splice(this.companyList.indexOf(i), 1);
    },
    onChange() {
      this.msg.companyList = validateCompanyList(this.companyList);
      for (let i = 0; i < this.companyList.length; i++) {
        this.msg.jobName = validateJobName(this.companyList[i].jobName);
        this.msg.jobDesc = validateJobDesc(this.companyList[i].jobDesc);
        this.msg.jobDate = validateJobDate(
          this.companyList[i].startDate,
          this.companyList[i].endDate
        );
      }
      if (!this.msg.length) {
        this.error = false;
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
  width: 118px;
  height: 40px;
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
