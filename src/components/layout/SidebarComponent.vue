<template>
  <div class="sidebar">
    <h3 class="sidebar-header">Basic Exercise</h3>
    <div v-for="(link, index) in links" :key="index">
      <router-link exact :to="link.url">{{ link.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Home", url: "/" },
        { name: "HelloWorld", url: "/helloworld" },
        { name: "Todo App", url: "/todoapp" },
      ],
    };
  },
};
</script>

<style scoped></style>
