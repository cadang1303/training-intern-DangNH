<template>
  <div>
    <AutoComplete
      :items="cities"
      :selectedArr="selectedCities"
      :placeholder="'Nhập tên thành phố để tìm kiếm...'"
      @onSelect="onSelect"
      @onCancel="onCancel"
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters("city", ["cities", "selectedCities"]),
  },
  mounted() {
    this.$store.dispatch("city/loadCityList");
  },
  methods: {
    ...mapActions("city", ["onSelect", "onCancel"]),
  },
};
</script>

<style></style>
