<template>
  <div class="container">
    <div class="form-group" :class="{ required: item.required }">
      <label class="control-label" :for="item.name">{{ item.label }}</label>
      <small v-if="item.textSmall">{{ item.textSmall }}</small>
      <InputField
        v-if="item.type === 'text'"
        :msg="item.msg"
        :name="item.name"
        :value="valueInput"
        :placeholder="item.placeholder"
        @onInput="onInput"
      />
      <TextareaInput
        v-if="item.type === 'textarea'"
        :msg="item.msg"
        :name="item.name"
        :value="valueInput"
        :onCounter="item.onCounter"
        :maxLength="item.maxLength"
        :placeholder="item.placeholder"
        @onInput="onInput"
      />
      <DatepickerForm
        v-if="item.type === 'date'"
        :msg="item.msg"
        :name="item.name"
        :value="valueInput"
        :placeholder="item.placeholder"
        @onInput="onInput"
      />
      <InputSelect
        v-if="item.type === 'select-city'"
        :msg="item.msg"
        :value="valueInput"
        :name="item.name"
        :list="item.list"
        :placeholder="item.placeholder"
        @onInput="onInput"
      />
      <DateRangeForm
        v-if="item.type === 'daterange'"
        :value="valueInput"
        :msg="item.msg"
        :name="item.name"
        :placeholder="item.placeholder"
        @onInput="onInput"
      />
      <MultiSelect
        v-if="item.type === 'multiselect'"
        :name="item.name"
        :textSmall="item.textSmall"
        :list="item.list"
        :chosenList="item.value"
        :placeholder="item.placeholder"
        @onSelectDropdown="onSelectJob"
        @onRemoveDropdown="onRemoveJob"
      />
      <ImageForm
        v-if="item.type === 'dropzone'"
        :placeholder="item.placeholder"
        :triggerText="item.triggerText"
        :dragText="item.dragText"
        :filesInput="item.value"
        :minFiles="item.minFiles"
        :maxFiles="item.maxFiles"
        :validExt="item.validExt"
        @onInputImg="onInputImg"
        @onRemoveImages="onRemoveImages"
      />
      <SalaryInput
        v-if="item.type === 'salary'"
        :msg="item.msg"
        :name="item.name"
        :value="valueInput"
        :currency="item.currency"
        :placeholder="item.placeholder"
        @onInput="onInput"
      />
    </div>
    <CompanyItem
      v-if="item.type === 'companies'"
      :form="item"
      @onChangeChildren="onChangeChildren"
      @onRemoveCompany="onRemoveCompany"
    />
  </div>
</template>

<script>
import DatepickerForm from "./formComponents/DatepickerForm";
import DateRangeForm from "./formComponents/DateRangeForm";
import InputField from "./formComponents/InputField";
import InputSelect from "./formComponents/InputSelect";
import TextareaInput from "./formComponents/TextareaInput";
import SalaryInput from "./formComponents/SalaryInput";
import ImageForm from "./formComponents/ImageForm";
import MultiSelect from "./formComponents/MultiSelect";
import CompanyItem from "./CompanyItem";

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Array, Number],
    },
  },
  data() {
    return {
      valueInput: "",
    };
  },
  watch: {
    value: {
      handler(value) {
        this.valueInput = value;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onSelectJob(i) {
      this.$emit("onSelectJob", i);
    },
    onRemoveJob(i) {
      this.$emit("onRemoveJob", i);
    },
    onInputImg(payload) {
      this.$emit("onInputImg", payload);
    },
    onInput(payload) {
      this.$emit("onInput", payload);
    },
    onRemoveImages(file) {
      this.$emit("onRemoveImages", file);
    },
    onChangeChildren(value, index) {
      this.$emit("onChangeCompanyForm", value, index);
    },
    onRemoveCompany() {
      this.$emit("onRemoveCompany");
    },
  },
  components: {
    InputField,
    TextareaInput,
    DatepickerForm,
    InputSelect,
    DateRangeForm,
    SalaryInput,
    ImageForm,
    MultiSelect,
    CompanyItem,
  },
};
</script>

<style scoped>
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
div >>> .container {
  width: 528px;
}

div >>> .main .dropzone-container {
  width: 844px;
  height: 192px;
}
</style>
