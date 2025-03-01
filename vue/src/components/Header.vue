
<template>
  <div class="header">
    <div class="header-top">
      logo
      <div class="navigation">
        <Navi/>
      </div>

      <el-avatar :size="50" :src="state.circleUrl"
                 fit="cover" @error="errorHandler"
                 @click="handlePersonal"
      />
    </div>
  </div>

</template>

<script setup>
import Navi from "@/components/Navigation.vue"
import {reactive} from "vue";
import router from "@/router/index.js";
import { ElNotification } from 'element-plus'
import axios from "axios";

axios.defaults.withCredentials = true

const data = reactive({
  area: '',
})


const state = reactive({
  circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const errorHandler = () => true
const handlePersonal = () => {
  router.push('/Personal')
}

const location = () => {
  navigator.geolocation.watchPosition(
      (position) => {  // latitude->维度  longitude->经度
        const location = {
          latitude : position.coords.latitude,
          longitude : position.coords.longitude,
        };
        axios.post(`http://localhost:9999/api/location`,location).then(res => {
          console.log(res)
        })
      }
  );
}
const location_OnlyFront = () => {
  navigator.geolocation.watchPosition(
      (position) => {  // latitude->维度  longitude->经度
        const location = {
          latitude : position.coords.latitude,
          longitude : position.coords.longitude,
        };
        axios.post(`http://localhost:9999/api/location`,location).then(res => {
          const district = res.data.features[0].properties.city
          const city = res.data.features[0].properties.address_line2.split(',')[1]
          const province = res.data.features[0].properties.address_line2.split(',')[2]
          const country = res.data.features[0].properties.address_line2.split(',')[3]
          data.area = `${district}, ${city}, ${province}`
        })
      }
  );
}

// 调用
</script>

<style scoped>
.header{
  margin-bottom: 5px;
}
.header-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: rgba(220, 217, 217, 0.3);
}
.navigation{
  width: 50%;
}
.location{
  font-size: 13px;
}
.el-card{
  width: 100%;
  display: flex;
  background-color: rgba(13,55,31,0.3);
}
</style>