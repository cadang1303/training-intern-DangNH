<template>
  <div class="main">
    <div
      class="dropzone-container"
      :class="{ 'drop-active': isDragging, 'drop-error': error }"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        name
        id="fileInput"
        class="hidden-input"
        ref="file"
        @change="onChange"
        multiple
      />
      <label for="fileInput" class="file-label">
        <img class="upload-icon" src="@/assets/icon/interfaces/upload.png" />
        <div v-if="isDragging" class="drag-text">
          Release to drop files here.
        </div>
        <div v-else>
          <div class="drag-text">Drag and drop files</div>
          <div class="click-input-text">Browse files</div>
        </div>
      </label>
    </div>
    <div v-if="error" class="error">
      {{ errorMsg }}
    </div>
    <div class="preview-container" v-if="files.length">
      <div v-for="file in files" :key="file.name" class="preview-card">
        <img
          v-if="file.extType === 1"
          class="preview-icon"
          src="@/assets/icon/files/excel.png"
        />
        <img
          v-if="file.extType === 2"
          class="preview-icon"
          src="@/assets/icon/files/pdf.png"
        />
        <img
          v-if="file.extType === 3"
          class="preview-icon"
          src="@/assets/icon/files/word.png"
        />
        <img
          v-if="file.extType === 4"
          class="preview-icon"
          src="@/assets/icon/files/unknown.png"
        />
        <div class="file-content">
          <div class="file-name">{{ file.name }}</div>
          <div class="file-size">{{ Math.round(file.size / 1000) + "kB" }}</div>
        </div>
        <div @click="remove(file)" class="file-cancel">
          <img src="@/assets/icon/interfaces/close-circle.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      error: false,
      errorMsg: "",
      files: [],
    };
  },
  methods: {
    onChange() {
      Array.from(this.$refs.file.files).forEach((file) => {
        if (this.uploadCheck(file)) {
          this.error = true;
          this.errorMsg = "The maximum file size is 10 MB";
        } else {
          this.error = false;
          this.files = [...this.$refs.file.files];
          Array.from(this.files).forEach((file) => {
            if (
              file.name.includes(".xls") ||
              file.name.includes(".xlsx") ||
              file.name.includes(".csv")
            ) {
              file.extType = 1;
            } else if (file.name.includes(".pdf")) {
              file.extType = 2;
            } else if (
              file.name.includes(".doc") ||
              file.name.includes(".docx")
            ) {
              file.extType = 3;
            } else {
              file.extType = 4;
            }
          });
        }
      });
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
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
    },
    uploadCheck(file) {
      return file.size > 10485760;
    },
  },
};
</script>

<style scoped>
.main {
  font-family: "Noto Sans";
  font-style: normal;
  height: 100vh;
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
.preview-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 2rem;
}
.preview-card {
  display: flex;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  width: 244px;
  height: 48px;
  padding: 5px;
  margin-right: 17px;
}
.preview-icon {
  width: 32px;
  height: 32px;
  margin: 2px;
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
