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
        name="file"
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
    <FileItem v-if="files.length" :files="files" @onRemove="onRemove" />
    <ButtonComponent
      :btnLabel="'Upload'"
      :disabled="!files.length"
      class="btn-upload"
      @onClick="uploadFiles"
    />
  </div>
</template>

<script>
import { validateExtension } from "@/utils/extension";
import app from "@/services/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import ButtonComponent from "@/components/base/ButtonComponent";
import FileItem from "./FileItem";

const MAX_SIZE = 10485760;

export default {
  components: {
    FileItem,
    ButtonComponent,
  },
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
        if (this.validateDuplicate(file)) {
          this.error = true;
          this.errorMsg = "File is already existed";
        } else if (this.validateFileSize(file)) {
          this.error = true;
          this.errorMsg = "The maximum file size is 10 MB";
        } else {
          this.error = false;
          this.files.push(file);
          Array.from(this.files).forEach((file) => {
            file.extType = validateExtension(file.name);
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
    onRemove(i) {
      this.files.splice(i, 1);
    },
    validateDuplicate(file) {
      var result = false;
      this.files.forEach((f) => {
        if (f.name === file.name) {
          result = true;
        } else {
          result = false;
        }
      });
      return result;
    },
    validateFileSize(file) {
      return file.size > MAX_SIZE;
    },
    async uploadFiles() {
      try {
        await this.files.forEach((file) => {
          const storage = getStorage(app);
          const storageRef = ref(storage, "files/" + file.name);
          uploadBytes(storageRef, file).then((snapshot) => {
            console.log("uploaded", snapshot);
          });
        });
        setTimeout((this.files = []), 3000);
      } catch (err) {
        console.log(err);
      }
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
.btn-upload {
  width: 100px;
  padding: 10px;
  margin: 20px 0;
  background: #5cb85c;
  border: 1px solid #5cb85c;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
button:disabled {
  opacity: 0.55;
  cursor: default;
}
</style>
