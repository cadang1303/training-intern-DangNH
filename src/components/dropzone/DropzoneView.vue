<template>
  <div class="container">
    <DropZone
      @onFileInput="onFileInput"
      @uploadFiles="uploadFiles"
      :maxSizeMB="MAX_SIZE_MB"
      :minFiles="MIN_FILES"
      :maxFiles="MAX_FILES"
      :validExt="VALID_EXT"
    />
  </div>
</template>

<script>
import app from "@/services/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import DropZone from "./DropZone";
import { MAX_SIZE_MB, MIN_FILES, MAX_FILES, VALID_EXT } from "@/constants";

export default {
  components: {
    DropZone,
  },
  data() {
    return {
      files: [],
      MAX_SIZE_MB,
      MIN_FILES,
      MAX_FILES,
      VALID_EXT,
    };
  },
  methods: {
    onFileInput(data) {
      this.files = data;
    },
    async uploadFiles() {
      try {
        for (let i = 0; i < this.files.length; i++) {
          console.log(this.files[i]);
          let storage = getStorage(app);
          let storageRef = ref(storage, "files/" + this.files[i].name);
          await uploadBytes(storageRef, this.files[i]);
        }
        this.files = [];
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
</style>
