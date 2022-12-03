<template>
  <div class="container">
    <DropZone @onFileInput="onFileInput" />
  </div>
</template>

<script>
import app from "@/services/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import DropZone from "./DropZone";

export default {
  components: {
    DropZone,
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    onFileInput(data) {
      this.files = data;
    },
    async uploadFiles() {
      try {
        for (let i = 0; i < this.files.length; i++) {
          const storage = getStorage(app);
          const storageRef = ref(storage, "files/" + this.files[i].name);
          await uploadBytes(storageRef, this.files[i]);
          this.files.splice(this.files.indexOf(this.files[i]), 1);
        }
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
