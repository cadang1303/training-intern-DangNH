<template>
  <div class="form-container">
    <form @input="onChange" @submit.prevent>
      <InputField
        :required="true"
        inputLabel="Họ và tên"
        name="fullname"
        :msg="msg.name"
        :value.sync="profile.name"
        @onInput="onInputName"
      />
      <DatepickerForm
        :required="true"
        inputLabel="Ngày sinh"
        :msg="msg.dob"
        name="dob"
        :value.sync="profile.dob"
        @onInput="onInputDob"
      />
      <SelectInput
        name="city"
        :list="cityList"
        placeholder="--Chọn thành phố--"
        :value.sync="profile.city"
        inputLabel="Thành phố"
      />
      <div class="form-group">
        <label class="control-label" for="job">Vị trí làm việc</label>
        <small>Có thể chọn nhiều vị trí mà bạn muốn làm việc</small>
        <AutoComplete
          :items="jobs"
          :selectedArr="profile.positions"
          :placeholder="'Chọn các vị trí mà bạn muốn'"
          @onSelect="onSelectPosition"
          @onCancel="onRemovePosition"
          @onInput="onInputPosition"
        />
      </div>
      <TextareaInput
        name="desc"
        :value.sync="profile.desc"
        :onCounter="true"
        :maxLength="1000"
        :msg="msg.desc"
        inputLabel="Mô tả về bản thân"
        @onInput="onInputDesc"
      />
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
import { mapGetters } from "vuex";
import { validateName, validateDob, validateDesc } from "@/utils/input";
import DatepickerForm from "./inputform/DatepickerForm";
import InputField from "./inputform/InputField";
import SelectInput from "./inputform/SelectInput";
import TextareaInput from "./inputform/TextareaInput";
import DropZone from "./inputform/DropZone";
import AutoComplete from "@/components/autocomplete/AutoComplete";

export default {
  components: {
    DatepickerForm,
    DropZone,
    AutoComplete,
    InputField,
    SelectInput,
    TextareaInput,
  },
  data() {
    return {
      profile: {
        name: "",
        dob: null,
        desc: "",
        city: "",
        positions: [],
        images: [],
      },
      jobs: [
        { id: 1, name: "BE Dev" },
        { id: 2, name: "FE Dev" },
        { id: 3, name: "QA" },
        { id: 4, name: "BA" },
        { id: 5, name: "Tester" },
        { id: 6, name: "QC" },
        { id: 7, name: "Game Dev" },
      ],
      msg: {},
      error: true,
    };
  },
  mounted() {
    this.$store.dispatch("form/loadCityList");
  },
  computed: {
    ...mapGetters("form", ["cityList"]),
  },
  methods: {
    onInputName() {
      this.msg.name = validateName(this.profile.name);
    },
    onInputDob() {
      this.msg.dob = validateDob(this.profile.dob);
    },
    onInputDesc() {
      this.msg.desc = validateDesc(this.profile.desc);
    },
    onInputPosition(value) {
      this.position = value;
    },
    onSelectPosition(item) {
      this.profile.positions.push(item);
      this.jobs = this.jobs.filter((p) => p.name != item.name);
    },
    onRemovePosition(item) {
      this.jobs.push(item);
      this.profile.positions = this.profile.positions.filter(
        (p) => p.name != item.name
      );
    },
    onImageInput(data) {
      this.profile.images = data;
    },
    onChange() {
      if (!this.msg.name && !this.msg.desc && !this.msg.dob) {
        this.error = false;
        this.$store.dispatch("form/onSetStatusForm", this.error);
        this.$store.dispatch("form/onSetProfile", this.profile);
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
</style>
