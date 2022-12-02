<template>
  <div>
    <AutoComplete
      :items="filterList"
      :selectedArr="selectedCities"
      :keyword="keyword"
      :placeholder="'Nhập tên thành phố để tìm kiếm...'"
      @onSelect="onSelect"
      @onCancel="onCancel"
      @onInput="onInput"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AutoComplete from "./AutoComplete";
export default {
  components: {
    AutoComplete,
  },
  computed: {
    ...mapGetters("city", ["filterList", "selectedCities", "keyword"]),
  },
  mounted() {
    this.$store.dispatch("city/loadCityList");
  },
  methods: {
    ...mapActions("city", ["onSelect", "onCancel", "onInput"]),
  },
};
</script>

<style></style>
