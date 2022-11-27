<template>
  <div class="layout">
    <SidebarComponent />
    <div class="view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "@/components/layout/SidebarComponent.vue";

export default {
  components: {
    SidebarComponent,
  },
};
</script>

<style>
.view-container {
  width: calc(100% - 300px);
  margin-left: 300px;
  padding: 24px;
}
.sidebar-header {
  font-size: 32px;
  color: #000;
  text-align: center;
  margin-bottom: 48px;
  margin-top: 20px;
}
.sidebar {
  margin: 0;
  padding: 0;
  width: 300px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100vh;
  overflow: auto;
}
.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
.sidebar .router-link-active {
  background-color: #1686ccf0;
  color: white;
  font-weight: bold;
}
.sidebar a:hover:not(.router-link-active) {
  background-color: #555;
  color: white;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
