<template>
  <div id="app">
    <router-view></router-view>
    <NotificationList />
  </div>
</template>

<script>
import NotificationList from "./components/base/NotificationList";

export default {
  components: {
    NotificationList,
  },
  name: "App",
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
}
</style>
