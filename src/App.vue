<template>
  {{ liff_id }}
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      liff_id: process.env.VUE_APP_LIFF_ID
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
