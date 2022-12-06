<template>
  <div class="form-container">
    <form @change="onChange" @submit.prevent>
      <div class="form-group required">
        <label class="control-label" for="name">Họ và tên</label>
        <input
          :class="{ 'form-error': msg.name }"
          class="form-control"
          name="name"
          type="text"
          v-model="profile.name"
        />
        <span v-if="msg.name" class="msg-text">
          {{ msg.name }}
        </span>
      </div>
      <div class="form-group required">
        <label class="control-label" for="dob">Ngày sinh</label>
        <DatePicker
          class="control-date"
          v-model="profile.dob"
          name="dob"
          type="date"
          :disabled-date="notAfterToday"
          placeholder="0000/00/00"
          format="YYYY/MM/DD"
        ></DatePicker>
        <span v-if="msg.dob" class="msg-text">
          {{ msg.dob }}
        </span>
      </div>
      <div class="form-group">
        <label class="control-label" for="city">Thành phố</label>
        <select
          class="form-control"
          :class="{ 'form-error': msg.city }"
          name="city"
          id="city"
          @change="(e) => (profile.city = e.target.value)"
        >
          <option selected disabled hidden>--Chọn thành phố--</option>
          <option v-for="city in cityList" :key="city.code" :value="city.name">
            {{ city.name }}
          </option>
        </select>
        <span v-if="msg.city" class="msg-text">
          {{ msg.city }}
        </span>
      </div>
      <div class="form-group">
        <label class="control-label" for="job">Vị trí làm việc</label>
        <small>Có thể chọn nhiều vị trí mà bạn muốn làm việc</small>
        <AutoComplete
          :items="jobs"
          :selectedArr="profile.positions"
          :placeholder="'Chọn các vị trí mà bạn muốn'"
          :keyword="profile.position"
          @onSelect="onSelectPosition"
          @onCancel="onRemovePosition"
          @onInput="onInputPosition"
        />
      </div>
      <div class="form-group">
        <label class="control-label" for="desc">Mô tả về bản thân</label>
        <textarea
          :class="{ 'form-error': msg.desc }"
          class="form-control"
          v-model="profile.desc"
          maxlength="1000"
        ></textarea>
        <div
          v-if="!msg.desc"
          class="counter"
          :class="{ 'counter-max': count === 1000 }"
        >
          {{ count }}/1000
        </div>
        <span v-else class="msg-text">
          {{ msg.desc }}
        </span>
      </div>
      <div class="form-group">
        <label class="control-label" for="profile-pic">Ảnh cá nhân</label>
        <DropZone
          :placeholder="'Hãy kéo và thả ảnh vào đây hoặc'"
          :triggerText="'nhấn vào đây'"
          :files="profile.images"
          @onFileInput="onImageInput"
        />
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import { mapGetters } from "vuex";
import { validateName, validateDob, validateDesc } from "@/utils/input";

import DropZone from "./inputform/DropZone";
import AutoComplete from "@/components/autocomplete/AutoComplete";

export default {
  components: {
    DatePicker,
    DropZone,
    AutoComplete,
  },
  data() {
    return {
      profile: {
        name: "",
        dob: "0000/00/00",
        desc: "",
        city: "",
        positions: [],
        images: [],
      },
      position: "",
      jobs: [
        { id: 1, name: "BE Dev" },
        { id: 2, name: "FE Dev" },
        { id: 3, name: "QA" },
        { id: 4, name: "BA" },
        { id: 5, name: "Tester" },
        { id: 6, name: "QC" },
        { id: 7, name: "Game Dev" },
      ],
      count: 0,
      msg: [],
      error: false,
    };
  },
  watch: {
    "profile.desc"(value) {
      this.profile.desc = value;
      this.count = this.profile.desc.length;
      this.msg.desc = validateDesc(this.profile.desc);
    },
    "profile.name"(value) {
      this.profile.name = value;
      this.msg.name = validateName(this.profile.name);
    },
    "profile.dob"(value) {
      this.profile.dob = value;
      this.msg.dob = validateDob(this.profile.dob);
    },
  },
  mounted() {
    this.$store.dispatch("form/loadCityList");
  },
  computed: {
    ...mapGetters("form", ["cityList"]),
  },
  methods: {
    notAfterToday(date) {
      const today = new Date();
      return date.getTime() > today.getTime();
    },
    onInputPosition(value) {
      this.position = value;
    },
    onSelectPosition(item) {
      this.profile.positions.push(item);
      this.jobs.splice(this.jobs.indexOf(item), 1);
    },
    onRemovePosition(item) {
      this.jobs.push(item);
      this.profile.positions.splice(this.profile.positions.indexOf(item), 1);
    },
    onImageInput(data) {
      this.profile.images = data;
    },
    onChange() {
      if (!this.msg.length) {
        this.$store.dispatch("form/onSetStatusForm", false);
        this.$store.dispatch("form/onSetProfile", this.profile);
      } else {
        this.$store.dispatch("form/onSetStatusForm", true);
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
.option-select {
  font-size: 14px;
  font-weight: 400;
  line-height: 20;
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
