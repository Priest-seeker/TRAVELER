
<template>
  <div class="Guangdong">
    <Header/>
    <div class="u-flex">
      <Side/>
      <div class="u-Guangdong">
        <div class="animate__animated animate__flipInX Title"> Guang&nbsp;dong </div>
        <el-card shadow="never" body-style="padding: 5px" class="card_Guangdong">

          <el-card class="content" shadow="hover" body-style="padding-top: 10px 5px">
            <template #header>
              <div class="card-header">
                <span class="content-title">Introduction</span>
              </div>
            </template>
            Guangdong Introduction
          </el-card>
          <el-card class="content" shadow="hover" body-style="padding-top: 10px 5px">
            <template #header>
              <div class="card-header">
                <span class="content-title">View</span>
              </div>
            </template>
            Guangdong View
          </el-card>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>

import {defineComponent, reactive, ref} from "vue";
import Side from "@/components/Map.vue";
import Header from "@/components/Header.vue";

const URL = reactive({
  img:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']
})
</script>

<style scoped>
.Guangdong{
  background-image: url("../../../public/Images/Guangdong/famous/Zaomu_mountain.png");
  background-size:cover;
}
.u-flex{
  display: flex;
  width: 95%;
}
.u-Guangdong{
  margin-left: 1%;
  flex-grow: 1;
  font-size: 20px;
}
.card-header{
  margin: 0;
}
.Title{
  --animate-delay: 4s;
  font-weight: bold;
  margin-bottom: 5px;
}
.card_Guangdong{
  background-color: rgba(255, 255, 255, 0.3);
  border-width: 1px 0 0 0;
}
.content-title{
  font-weight: bold;
}
.content{
  background-color: rgba(255, 255, 255, 0);
  border-width: 0;
  margin-bottom: 3px;
}
.content:hover{
  box-shadow: 3px 3px 3px 3px #494646;
}
</style>