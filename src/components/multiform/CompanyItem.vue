<template>
  <div class="form-company-container">
    <div class="content" v-for="(item, index) in form.fields" :key="item.name">
      <SelectCompany
        v-if="item.type === 'select-company'"
        :inputLabel="item.label"
        :msg="item.msg"
        :name="item.name"
        :value="item.value"
        :list="item.list"
        :placeholder="item.placeholder"
        @onInput="(value) => onChangeItem(value, index)"
        @onRemove="onRemoveCompany"
      />
      <div
        class="form-group"
        v-if="item.type != 'select-company'"
        :class="{ required: item.validation.required }"
      >
        <label v-if="item.label" class="control-label" :for="item.name">{{
          item.label
        }}</label>
        <small v-if="item.textSmall">{{ item.textSmall }}</small>
        <InputField
          v-if="item.type === 'text'"
          :inputLabel="item.label"
          :maxLength="item.validation.maxLength"
          :msg="item.msg"
          :value="item.value"
          :name="item.name"
          :placeholder="item.placeholder"
          @onInput="(value) => onChangeItem(value, index)"
        />
        <DateRangeForm
          v-if="item.type === 'daterange'"
          :inputLabel="item.label"
          :msg="item.msg"
          :value="item.value"
          :name="item.name"
          :placeholder="item.placeholder"
          @onInput="(value) => onChangeItem(value, index)"
        />
        <TextareaInput
          v-if="item.type === 'textarea'"
          :inputLabel="item.label"
          :msg="item.msg"
          :name="item.name"
          :value="item.value"
          :onCounter="item.onCounter"
          :maxLength="item.validation.maxLength"
          :placeholder="item.placeholder"
          @onInput="(value) => onChangeItem(value, index)"
        />
      </div>
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
.form-company-container {
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
</style>
