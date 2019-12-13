<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
