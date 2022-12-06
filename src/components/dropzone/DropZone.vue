<template>
  <div class="main">
    <div
      class="dropzone-container"
      :class="{ 'drop-active': isDragging, 'drop-error': msg.error }"
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
        <div v-if="isDragging" class="drag-text">{{ dragText }}</div>
        <div v-else>
          <div class="drag-text">{{ placeholder }}</div>
          <div class="click-input-text">{{ triggerText }}</div>
        </div>
      </label>
    </div>
    <span v-if="msg.length" :class="{ error: msg.error, success: msg.success }">
      {{ msg.error }} {{ msg.success }}
    </span>
    <div v-if="files.length" class="preview-container">
      <FileItem
        v-for="file in files"
        :key="file.name"
        :file="file"
        @onRemove="onRemove"
      />
    </div>
    <ButtonComponent
      :btnLabel="'Upload'"
      :disabled="!files.length || files.length < MIN_FILES"
      class="btn-upload"
      @onClick="uploadFiles"
    />
  </div>
</template>

<script>
import ButtonComponent from "@/components/base/ButtonComponent";
import FileItem from "./FileItem";
import { MAX_SIZE, MIN_FILES, MAX_FILES } from "@/constants";
import {
  getFileType,
  validateExtension,
  validateFileSize,
  validateNumberOfFiles,
  validateDuplicate,
  returnFileSize,
} from "@/utils/validate";

export default {
  props: {
    placeholder: {
      type: String,
      default: () => "Drag and drop files",
    },
    triggerText: {
      type: String,
      default: () => "Browse files",
    },
    dragText: {
      type: String,
      default: () => "Release to drop files here.",
    },
  },
  components: {
    FileItem,
    ButtonComponent,
  },
  data() {
    return {
      isDragging: false,
      msg: [
        {
          error: "",
        },
        {
          success: "",
        },
      ],
      files: [],
      MIN_FILES,
    };
  },
  methods: {
    onChange() {
      this.msg.success = "";
      const uploadFiles = [...this.$refs.file.files];
      if (validateNumberOfFiles(uploadFiles.length + this.files.length)) {
        this.msg.error = `You can only upload maximum ${MAX_FILES}.`;
      } else {
        uploadFiles.forEach((file) => {
          if (validateDuplicate(file, this.files)) {
            this.msg.error = "File is already existed.";
          } else if (validateFileSize(file)) {
            this.msg.error = `The maximum file size is ${returnFileSize(
              MAX_SIZE
            )}.`;
          } else if (!validateExtension(file.name)) {
            this.msg.error = "File type is not allowed to upload.";
          } else {
            this.msg.error = "";
            this.files.push(file);
            Array.from(this.files).forEach((file) => {
              file.extType = getFileType(file.name);
            });
          }
        });
        this.$emit("onFileInput", this.files);
      }
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
      this.files.splice(this.files.indexOf(i), 1);
    },
    uploadFiles() {
      this.$emit("uploadFiles");
      this.msg.error = "";
      this.msg.success = "Uploaded Successfully!";
      this.files = [];
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
.success {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #5cb85c;
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
