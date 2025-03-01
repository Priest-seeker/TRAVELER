
<template>
  <Header/>
  <div class="u-flex">
      <Side/>
    <div>
      <h1>Guangzhou</h1>
    </div>
  </div>
</template>

<script setup>
import Side from "@/components/Map.vue";
import Header from "@/components/Header.vue";
</script>

<style scoped>
.u-flex{
  display: flex;
}
</style>