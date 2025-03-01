
<template>
  <Header/>
  <div class="u-flex">
    <PersonalSide/>
    <div>
      <div class="posting-main">
        <el-card body-style="padding: 5px" class="main-card" shadow="never">
          <el-card v-for="post in data.PostList" shadow="hover" class="post-card" body-style="padding: 5px">
            <section>{{post.title}}</section>
            <div class="post-card-content">
              <section>
                <section>
                  <span v-if="post.content!=='' && post.content!==null">{{post.content}}</span>
                  <span v-else>暂无描述</span>
                </section>
                <section>
                  {{post.district}},{{post.city}},{{post.province}}
                </section>
              </section>
              <section>
                TIME
              </section>
            </div>
          </el-card>
        </el-card>
        <el-pagination
            :hide-on-single-page="true"
            v-model:page-size="data.pageSize"
            v-model:current-page="data.pageNum"
            :count-page="3"
            layout="prev, pager, next, jumper"
            :total="data.total"
            @current-change="load"
        />
      </div>
      <div>
        <el-card shadow="hover" class="card" body-style="display:flex;justify-content:center">
          <el-button type="primary" :icon="Edit" circle size="large" @click="Form"/>
        </el-card>
      </div>
    </div>
    <!-- Form -->
    <el-drawer
        v-model="config.dialog"
        title="Writing Post"
        direction="rtl"
        class="demo-drawer"
        size="80%"
    >
      <div class="demo-drawer__content">
        <el-form :model="data.form" :rules="rules">
          <el-form-item label="Name" :label-width="config.formLabelWidth" prop="postTitle">
            <el-input v-model="data.form.title" autocomplete="off" />
          </el-form-item>
          <!-- Province Level -->
          <el-form-item label="Province" :label-width="config.formLabelWidth" prop="province">
            <el-select
                v-model="data.form.province"
                placeholder="Please select activity area"
                @change="loadCityList"
            >
              <el-option :label="province.province" :value="province.province"
                         v-for="province in data.ProvinceList" :keys="province.code" />
            </el-select>
          </el-form-item>
          <!-- City Level -->
          <el-form-item label="City" :label-width="config.formLabelWidth" prop="city">
            <el-select
                v-model="data.form.city"
                placeholder="Please select activity area"
                @change="loadDistrictList"
            >
              <el-option :label="city.city" :value="city.city"
                         v-for="city in data.CityList" :keys="city.code"/>
            </el-select>
          </el-form-item>
          <!-- District Level -->
          <el-form-item label="District" :label-width="config.formLabelWidth" prop="district">
            <el-select
                v-model="data.form.district"
                placeholder="Please select activity area"
            >
              <el-option :label="district.district" :value="district.district"
                         v-for="district in data.DistrictList" :keys="district.code"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">Cancel</el-button>
          <el-button type="primary" :loading="config.loading" @click="onClick">
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
import { ElMessage } from 'element-plus'

const data = reactive({
  pageNum: 1,
  pageSize: 2,
  total: 0,
  form: {
    Province: {},
    City: {},
    District: {},
  },
  PostList:{},
  ProvinceList:{},
  CityList:{},
  DistrictList:{},
})
let timer;
const config = reactive({
  formLabelWidth :'80px',
  table: false,
  dialog: false,
  loading: false,
})
const rules =  reactive({
  postTitle :[
    { required: true, message: 'Please enter Title', trigger: 'blur' },
  ],
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
  data.form = {}
}

const onClick = () => {
  config.loading = true
  if(data.form.title === "" || data.form.title === undefined){
    setTimeout(() => {
      config.loading = false
    }, 400)
    ElMessage({
      message: 'The title of the post cannot be empty.',
      grouping: true,
      type: 'warning',
    })
  }else if(data.form.province === "" || data.form.province === undefined){
    config.loading = true
    setTimeout(() => {
      config.loading = false
    }, 400)
    ElMessage({
      message: 'The province of the post cannot be empty.',
      grouping: true,
      type: 'warning',
    })
  }else if(data.form.city === "" || data.form.city === undefined){
    config.loading = true
    setTimeout(() => {
      config.loading = false
    }, 400)
    ElMessage({
      message: 'The city of the post cannot be empty.',
      grouping: true,
      type: 'warning',
    })
  }else if(data.form.district === "" || data.form.district === undefined){
    config.loading = true
    setTimeout(() => {
      config.loading = false
    }, 400)
    ElMessage({
      message: 'The district of the post cannot be empty.',
      grouping: true,
      type: 'warning',
    })
  } else {
    setTimeout(() => {
      config.loading = false
      config.dialog = false
    }, 400)
    axios.post('http://localhost:9999/post/save',data.form).then(res => {
      if(res.data.code === 200){
        ElMessage({
          message: 'Write a post successfully.',
          grouping: true,
          type: 'success',
        })
      }else{
        ElMessage({
          message: 'Submit failed, please try again later.',
          grouping: true,
          type: 'error',
        })
      }
      load()
    })
  }
}

const cancelForm = () => {
  config.loading = false
  config.dialog = false
  clearTimeout(timer)
}
const loadProvince = () => {
  axios.get('http://localhost:9999/province/query').then(res => {
    data.ProvinceList = res.data.data;
  })
}
const loadCityList = (provinceName) => {
  data.form.city = ""
  const Province = {}
  Province.province = provinceName
  axios.post('http://localhost:9999/province/queryCode', Province).then(res => {
    const CityList = {}
    CityList.province_code = res.data.data[0].code;
    axios.post('http://localhost:9999/city/query', CityList).then(res => {
      data.CityList = res.data.data
    })
  })
}
const loadDistrictList = (cityName) => {
  data.form.district = ""
  const City = {}
  City.city = cityName
  axios.post('http://localhost:9999/city/query', City).then(res => {
    const DistrictList = {}
    DistrictList.city_code = res.data.data[0].code;
    axios.post('http://localhost:9999/district/query', DistrictList).then(res => {
      data.DistrictList = res.data.data
      console.log(data.DistrictList)
    })
  })
}
const load = () => {
  axios.get('http://localhost:9999/post/queryPage',{
    params:{
      pageNum: data.pageNum,
      pageSize: data.pageSize,
    }}).then(res => {
      data.PostList = res.data.data?.records
      data.total = res.data?.data?.total
  })
}
load()
loadProvince()
</script>

<style scoped>
.u-flex,.post-card-content{
  display: flex;
}
.post-card-content{
  justify-content: space-between;
}
.posting-main{
  margin-top: 5px;
  margin-left: 0.7%;
  margin-bottom: 5px;
}

.card{
  width: 100%;
  margin-left: 0.7%;
  border-width: 1px 0 0 0;
}

.main-card{
  border-width: 0 0 0 1px;
  min-width: 80%
}

.post-card{
  margin-bottom: 5px;
  width: 100%
}
</style>