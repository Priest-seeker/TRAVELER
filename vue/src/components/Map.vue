
<template>
  <el-menu
      :default-active="router.currentRoute.value.path"
      class="el-menu-vertical-demo"
      :collapse="false"
      :unique-opened="true"
      :router="true"
  >
    <el-sub-menu index="GD">
      <template #title>
        <span class="t-content">Guangdong</span>
      </template>
      <el-menu-item index="/MAP/Guangdong">
        <template #title><span class="t-content">Guangdong</span></template>
      </el-menu-item>
      <el-menu-item index="/MAP/Guangdong/Guangzhou">
        <template #title><span class="t-content">Guangzhou</span></template>
      </el-menu-item>
      <el-menu-item>
        <template #title><span class="t-content">Shenzhen</span></template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="BJ">
      <template #title>
        <span class="t-content">Beijing</span>
      </template>
      <el-menu-item>
        <template #title><span class="t-content">Beijing district1</span></template>
      </el-menu-item>
      <el-menu-item>
        <template #title><span class="t-content">Beijing district2</span></template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import router from "@/router/index.js";

</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12%;
}

.el-menu,.el-menu-item{ /* Change menu color */
  background: rgba(0,128,0,0.5);
}

.t-content{
  font-weight: bold;
  overflow: hidden;
}
</style>