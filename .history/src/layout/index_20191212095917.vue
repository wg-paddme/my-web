<template>
  <div class="app-wrapper">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>
<style lang="less">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
