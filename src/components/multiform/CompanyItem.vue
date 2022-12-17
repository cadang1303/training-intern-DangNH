<template>
  <div class="form-container">
    <div class="content" v-for="(item, index) in form.fields" :key="item.name">
      <SelectCompany
        v-if="item.type === 'select-company'"
        :required="item.required"
        :inputLabel="item.label"
        :msg="item.msg"
        :name="item.name"
        :value="item.value"
        :list="item.list"
        :placeholder="item.placeholder"
        @onInput="(value) => onChangeItem(value, index)"
        @onRemove="onRemoveCompany"
      />
      <InputField
        v-if="item.type === 'text'"
        :required="item.required"
        :inputLabel="item.label"
        :msg="item.msg"
        :value="item.value"
        :name="item.name"
        :placeholder="item.placeholder"
        @onInput="(value) => onChangeItem(value, index)"
      />
      <DateRangeForm
        v-if="item.type === 'daterange'"
        :required="item.required"
        :inputLabel="item.label"
        :msg="item.msg"
        :value="item.value"
        :name="item.name"
        :placeholder="item.placeholder"
        @onInput="(value) => onChangeItem(value, index)"
      />
      <TextareaInput
        v-if="item.type === 'textarea'"
        :required="item.required"
        :inputLabel="item.label"
        :msg="item.msg"
        :name="item.name"
        :value="item.value"
        :onCounter="item.onCounter"
        :maxLength="item.maxLength"
        :placeholder="item.placeholder"
        @onInput="(value) => onChangeItem(value, index)"
      />
    </div>
  </div>
</template>

<script>
import SelectCompany from "./formComponents/SelectCompany";
import InputField from "./formComponents/InputField";
import DateRangeForm from "./formComponents/DateRangeForm";
import TextareaInput from "./formComponents/TextareaInput";

export default {
  components: {
    SelectCompany,
    InputField,
    DateRangeForm,
    TextareaInput,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onRemoveCompany() {
      this.$emit("onRemoveCompany");
    },
    onChangeItem(value, index) {
      this.$emit("onChangeChildren", value, index);
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
</style>
