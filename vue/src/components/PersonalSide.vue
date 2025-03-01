
<template>
  <el-menu
      :default-active="router.currentRoute.value.path"
      class="el-menu-vertical-demo"
      :collapse="false"
      :unique-opened="true"
      :router="true"
  >
    <el-menu-item index="/Personal/Posting">
      <span>Post</span>
    </el-menu-item>
    <el-menu-item index="/Personal/Area">
      <span>Area</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import router from "@/router/index.js";
</script>


<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 15.7%;
}

.el-menu-item{ /* Change menu color */
  background: rgba(0,128,0,0.5);
}
</style>