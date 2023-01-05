<template>
  <div :class="typeClass" class="noti-container">
    <div class="noti-content">{{ notification.message }}</div>
    <div class="btn-cancel" @click="removeNotification(notification)">x</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification(this.notification);
    }, 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    typeClass() {
      return `alert-${this.notification.type}`;
    },
  },
  methods: {
    ...mapActions("notifications", ["removeNotification"]),
  },
};
</script>

<style scoped>
.noti-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  width: 356px;
  height: 48px;
  line-height: 20px;
  padding: 14px;
  margin-top: 10px;
  border-radius: 8px;
}
.alert-success {
  background: #a6d8a6;
  border: 1px solid #5cb85c;
}
.alert-danger {
  background: #e38582;
  border: 1px solid #d9534f;
}
.noti-content {
  font-size: 16px;
  font-family: "Noto Sans";
  font-weight: 400;
  margin-left: 4px;
  flex-grow: 4;
}
.btn-cancel {
  font-weight: 600;
  line-height: 20px;
  margin: 0 auto;
  cursor: pointer;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
