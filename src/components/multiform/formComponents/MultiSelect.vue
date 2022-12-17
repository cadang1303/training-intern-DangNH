<template>
  <div class="form-group" :class="{ required: required }">
    <label class="control-label" :for="name">{{ inputLabel }}</label>
    <small>{{ textSmall }}</small>
    <AutoComplete
      :items="filteredList"
      :selectedArr="chosenList"
      :placeholder="placeholder"
      @onSelect="onSelectDropdown"
      @onCancel="onRemoveDropdown"
      @onInput="onInputKeyword"
    />
    <span class="msg-text">
      {{ msg }}
    </span>
  </div>
</template>

<script>
import AutoComplete from "@/components/autocomplete/AutoComplete.vue";

export default {
  props: {
    required: {
      type: Boolean,
      default: () => false,
    },
    inputLabel: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    list: {
      type: Array,
      required: true,
    },
    chosenList: {
      type: Array,
      required: true,
    },
    textSmall: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    msg: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    filteredList() {
      return this.list.filter((i) => {
        return (
          i.name.toLowerCase().includes(this.keyword.toLowerCase()) &&
          this.keyword.length > 0 && !i.isChosen
        );
      });
    },
  },
  methods: {
    onInputKeyword(keyword) {
      this.keyword = keyword;
    },
    onSelectDropdown(i) {
      this.$emit("onSelectDropdown", i);
    },
    onRemoveDropdown(i) {
      this.$emit("onRemoveDropdown", i);
    },
  },
  components: { AutoComplete },
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
</style>
