<template>
  <div class="container">
    <DropZone
      :error="error"
      :errorMsg="errorMsg"
      :files="files"
      @onFileInput="onFileInput"
      @onRemove="onRemove"
      @drop="drop"
    />
    <div class="upload">
      <ButtonComponent
        :btnLabel="'Upload'"
        :disabled="!files.length"
        class="btn-upload"
        @onClick="uploadFiles"
      />
    </div>
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
import ButtonComponent from "@/components/base/ButtonComponent";
import DropZone from "./DropZone";

export default {
  components: {
    DropZone,
    ButtonComponent,
  },
  data() {
    return {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
