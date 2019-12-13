<template>
  <div class="app-wrapper">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>
<style lang="less">
.app-wrapper {
  position: relative;

  width: 100%;
}
</style>
