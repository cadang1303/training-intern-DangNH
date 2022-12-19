<template>
  <div class="container">
    <InputField
      v-if="item.type === 'text'"
      :required="item.required"
      :inputLabel="item.label"
      :msg="item.msg"
      :name="item.name"
      :value="valueInput"
      :placeholder="item.placeholder"
      @onInput="onInput"
    />
    <TextareaInput
      v-if="item.type === 'textarea'"
      :required="item.required"
      :inputLabel="item.label"
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
      :required="item.required"
      :inputLabel="item.label"
      :msg="item.msg"
      :name="item.name"
      :value="valueInput"
      :placeholder="item.placeholder"
      @onInput="onInput"
    />
    <InputSelect
      v-if="item.type === 'select-city'"
      :required="item.required"
      :inputLabel="item.label"
      :msg="item.msg"
      :value="valueInput"
      :name="item.name"
      :list="item.list"
      :placeholder="item.placeholder"
      @onInput="onInput"
    />
    <DateRangeForm
      v-if="item.type === 'daterange'"
      :required="item.required"
      :inputLabel="item.label"
      :value="valueInput"
      :msg="item.msg"
      :name="item.name"
      :placeholder="item.placeholder"
      @onInput="onInput"
    />
    <MultiSelect
      v-if="item.type === 'multiselect'"
      :required="item.required"
      :inputLabel="item.label"
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
      :inputLabel="item.label"
      :required="item.required"
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
      :required="item.required"
      :inputLabel="item.label"
      :msg="item.msg"
      :name="item.name"
      :value="valueInput"
      :currency="item.currency"
      :placeholder="item.placeholder"
      @onInput="onInput"
    />
    <CompanyItem
      v-if="item.type === 'company-item'"
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
    onRemoveImages(index) {
      this.$emit("onRemoveImages", index);
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
div >>> .container {
  width: 528px;
}

div >>> .main .dropzone-container {
  width: 844px;
  height: 192px;
}
</style>
