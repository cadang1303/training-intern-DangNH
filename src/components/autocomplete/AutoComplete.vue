<template>
  <div class="container">
    <label for="city">
      <div class="autocomplete" @click="visible = true">
        <img src="@/assets/icon/interfaces/search.svg" />
        <span
          class="selected-item"
          v-for="(selected, index) in selectedArr"
          :key="index"
        >
          {{ selected.name }}
          <b class="cancel-select" @click="handleCancel(selected)">x</b>
        </span>
        <input
          type="text"
          name="city"
          list="city"
          id="city"
          class="autocomplete-input"
          autocomplete="off"
          v-model="keyword"
          :placeholder="placeholder"
        />
      </div>
      <div v-if="visible" class="options">
        <ul>
          <li
            @click="handleSelect(item)"
            v-for="(item, index) in filterList"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedArr: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: () => "Typing...",
    },
  },
  data() {
    return {
      keyword: "",
      visible: false,
    };
  },
  computed: {
    filterList() {
      if (this.keyword === "") {
        return [];
      }
      return this.items.filter((i) =>
        i.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
  },
  methods: {
    handleSelect(item) {
      this.$emit("onSelect", item);
      this.visible = false;
      this.keyword = "";
    },
    handleCancel(item) {
      this.$emit("onCancel", item);
      this.keyword = "";
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Noto Sans";
  font-style: normal;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
}
.autocomplete {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  min-height: 49px;
  padding: 10px;
  gap: 4px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  cursor: text;
}
.autocomplete:hover {
  border: 1px solid #1991d2;
}
.autocomplete input {
  width: 320px;
  min-width: 50px;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.autocomplete input::placeholder {
  color: #bfbfbf;
  font-family: "Noto Sans";
  font-style: normal;
}
.options {
  max-height: 128px;
  border-radius: 4px;
  background-color: white;
  filter: drop-shadow(0px 1px 8px rgba(102, 102, 102, 0.25));
  overflow-y: scroll;
  font-family: "Noto Sans JP";
  font-style: normal;
}
.options ul li {
  background-color: #f1f5f8;
  font-size: 16px;
  line-height: 23px;
  height: 40px;
  padding: 10px;
  color: #486581;
  cursor: pointer;
}
.options ul li:hover,
.options ul li:focus,
.active {
  background-color: #617d98;
  color: #ffffff;
}
.cancel-select {
  cursor: pointer;
}
.selected-item {
  display: inline-block;
  padding: 4px 8px;
  margin: 2px;
  height: 32px;
  background: #f0f4f8;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  line-height: 20px;
  color: #627d98;
}
</style>
