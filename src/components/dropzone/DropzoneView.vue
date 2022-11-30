<template>
  <div class="container">
    <DropZone
      ref="ref"
      :error="error"
      :errorMsg="errorMsg"
      :files="files"
      @onFileInput="onFileInput"
      @onRemove="onRemove"
      @drop="drop"
      @uploadFiles="uploadFiles"
    />
  </div>
</template>

<script>
import app from "@/services/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  validateExtension,
  validateFileSize,
  validateDuplicate,
} from "@/utils/validate";
import DropZone from "./DropZone";

export default {
  components: {
    DropZone,
  },
  data() {
    return {
      fileDrop: {},
      files: [],
      error: false,
      errorMsg: "",
    };
  },
  methods: {
    onFileInput(data) {
      Array.from(data).forEach((file) => {
        if (validateDuplicate(file, this.files)) {
          this.error = true;
          this.errorMsg = "File is already existed";
        } else if (validateFileSize(file)) {
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
    drop(e) {
      this.onFileInput(e);
    },
    onRemove(i) {
      this.files.splice(i, 1);
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
