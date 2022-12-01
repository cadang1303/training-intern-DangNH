<template>
  <div class="main">
    <div
      class="dropzone-container"
      :class="{ 'drop-active': isDragging, 'drop-error': errorMsg.length }"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        name="file"
        id="fileInput"
        class="hidden-input"
        ref="file"
        @change="onChange"
        multiple
      />
      <label for="fileInput" class="file-label">
        <img class="upload-icon" src="@/assets/icon/interfaces/upload.png" />
        <div class="drag-text">{{ placeholder }}</div>
        <div class="click-input-text">{{ triggerText }}</div>
      </label>
    </div>
    <span v-if="errorMsg.length" class="error">
      {{ errorMsg }}
    </span>
    <FileItem v-if="files.length" :files="files" @onRemove="onRemove" />
  </div>
</template>

<script>
import FileItem from "./FileItem";

export default {
  props: {
    errorMsg: {
      type: String,
      default: () => "",
    },
    files: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: () => "Drag and drop files",
    },
    triggerText: {
      type: String,
      default: () => "Browse files",
    },
  },
  components: {
    FileItem,
  },
  data() {
    return {
      isDragging: false,
    };
  },
  methods: {
    onChange(e) {
      this.$emit("onFileInput", e.target.files);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$emit("drop", e.dataTransfer.files);
      this.isDragging = false;
    },
    onRemove(i) {
      this.$emit("onRemove", i);
    },
  },
};
</script>

<style scoped>
.main {
  font-family: "Noto Sans";
  font-style: normal;
  display: flex;
  flex-direction: column;
}
.dropzone-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 842px;
  height: 232px;
  padding: 4rem;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
}
/* .drop-active {
  background: #336699;
  color: #fff;
} */
.drop-error {
  border: 1px solid #ed5d5d;
}
.drag-text {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #333333;
}
.click-input-text {
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #333333;
  text-decoration: underline;
}
.upload-icon {
  margin-bottom: 20px;
}
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
.error {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ed5d5d;
  margin-top: 17px;
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
</style>
