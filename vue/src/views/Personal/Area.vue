<template>
  <Header/>
  <div class="u-flex">
    <PersonalSide/>
    <div>
      <div class="posting-main">
        <el-tabs type="border-card" @tab-click="getProvinceCode">
          <el-tab-pane :label="province.province" v-for="province in data.Province">
            <div class="demo-collapse">
              <el-collapse accordion @change="getCityList" v-model="data.activeNames">
                <el-collapse-item :title="city.city" v-for="city in data.City" :name="city.code">
                  <el-card style="max-width: 480px" body-style="padding: 10px" shadow="hover" class="districtCard" v-for="district in data.District" >
                    {{district.district}}
                  </el-card>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="card">
        <el-card shadow="hover">
          <el-button type="primary" :icon="Edit" circle size="large" @click="Form"/>
        </el-card>
      </div>
    </div>
    <!-- Drawer-Form -->
    <el-drawer
        v-model="config.dialog"
        title="Writing Post"
        direction="rtl"
        class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="data.form" :rules="rules">
          <el-form-item label="Province" :label-width="config.formLabelWidth" prop="province">
            <el-input v-model="data.form.provinceForm.province" style="width: 240px" placeholder="Please input a province" />
          </el-form-item>
          <el-form-item label="City" :label-width="config.formLabelWidth" prop="city">
            <el-input v-model="data.form.cityForm.city" style="width: 240px" placeholder="Please input a city" />
          </el-form-item>
          <el-form-item label="District" :label-width="config.formLabelWidth" prop="district">
            <el-input v-model="data.form.districtForm.district" style="width: 240px" placeholder="Please input a district" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">Cancel</el-button>
          <el-button type="primary" :loading="config.loading" @click="save">
            {{ config.loading ? 'Submitting ...' : 'Submit' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import PersonalSide from "@/components/PersonalSide.vue";
import Header from "@/components/Header.vue";
import {reactive} from "vue";
import {Edit} from "@element-plus/icons-vue";
import { ElDrawer, ElMessageBox } from 'element-plus'
import axios from "axios";

/**
 * 外部js
 */
import {GuangdongMap} from "../../../public/China/GuangdongMap.js";
import {ChinaMap} from "../../../public/China.js";
import {GuangzhouMap} from "../../../public/Guangdong/GuangzhouMap.js";
/**
 * 外部js
 */
const data = reactive({
  form: {
    cityForm:{},
    provinceForm:{},
    districtForm:{}
  },
  Province: {},
  City: {},
  District: {},
  activeNames: '',
})
let timer;
const config = reactive({
  formLabelWidth :'80px',
  table: false,
  dialog: false,
  loading: false,
})
const rules =  reactive({
  province: [
    { required: true, message: 'Please enter province', trigger: 'blur' },
  ],
  city: [
    { required: true, message: 'Please enter city', trigger: 'blur' },
  ],
  district: [
    { required: true, message: 'Please enter district', trigger: 'blur' },
  ],
})
const Form = () => {
  config.dialog = true
}
const save = () => {
  data.form.provinceForm.code = ChinaMap[`${data.form.provinceForm.province}`]
  data.form.cityForm.code = GuangdongMap[`${data.form.cityForm.city}`]
  data.form.districtForm.code = GuangzhouMap[`${data.form.districtForm.district}`]

  console.log(data.form.provinceForm.code)
  console.log(data.form.cityForm.code)
  console.log(data.form.districtForm.code)
  config.loading = true
  setTimeout(() => {
    config.loading = false
    config.dialog = false
  }, 400)
}
const cancelForm = () => {
  config.loading = false
  config.dialog = false
  clearTimeout(timer)
}
const load = () => {
  axios.get('http://localhost:9999/province/query').then(res => {
    data.Province = res.data.data;
    const provinceList = {}
    provinceList.province_code = data.Province[0].code
    axios.post('http://localhost:9999/city/query', provinceList).then(res => {
      data.City = res.data.data;
    })
  })
}
const getProvinceCode = (code) => {
  const Province = {}
  Province.province = code.props.label
  axios.post('http://localhost:9999/province/queryCode', Province).then(res => {
    const CityList = {}
    CityList.province_code = res.data.data[0].code
    //console.log(provinceList)
    axios.post('http://localhost:9999/city/query', CityList).then(res => {
      data.City = res.data.data;
    })
  })
}
const getCityList = (code) => {
  const CityList = {}
  CityList.city_code = code
  axios.post('http://localhost:9999/district/query', CityList).then(res => {
    data.District = res.data.data;
  })
}

console.log(ChinaMap["Guangdong"]);
console.log(GuangdongMap["Guangzhou"]);
console.log(GuangzhouMap["Tianhe"]);
load()
</script>

<style scoped>
.u-flex{
  display: flex;
}

.posting-main{
  margin-top: 20px;
  margin-left: 0.7%;
  margin-bottom: 5px;
}

.card{
  width: 100%;
}

.districtCard{
  border-width: 1px 0 0 0;
  margin-bottom: 5px;
}
.el-collapse-item__content{
  margin-bottom: 0;
}
</style>