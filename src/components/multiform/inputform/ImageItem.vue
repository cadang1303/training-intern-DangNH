<template>
  <div class="preview-card">
    <div class="file-content">
      <img :src="generateURL(file)" class="preview-img" />
    </div>
    <div @click="onRemove(file)" class="file-cancel">
      <img src="@/assets/icon/interfaces/close-circle.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: File,
      default: () => null,
    },
  },
  data() {
    return {};
  },
  methods: {
    onRemove(file) {
      this.$emit("onRemove", file);
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
  },
};
</script>

<style scoped>
.preview-card {
  display: flex;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  width: 244px;
  padding: 5px;
  margin-right: 17px;
}
.preview-img {
  height: 200px;
  width: 150px;
}
.file-content {
  padding: 4px;
  justify-content: left;
}
.file-name {
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: #333333;
  width: 125px;
  height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-size {
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  color: #666666;
}
.file-cancel {
  width: 12.67px;
  height: 12.67px;
  margin: auto;
  margin-right: 9.33px;
}
</style>
