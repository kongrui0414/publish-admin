<template>
<div class="settings-container">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--    面包屑导航-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
      <!--面包屑导航ending-->
    </div>
    <el-row>
      <el-col :span="15">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="编号">
            {{ user.id }}
          </el-form-item>
          <el-form-item label="手机">
            {{ user.mobile }}
          </el-form-item>
          <el-form-item label="媒体名称">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍">
            <el-input type="textarea" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col offset="2" :span="4">
        <label for="file">
          <el-avatar
          shape="square"
          :size="150"
          :fit="cover"
          :src="user.photo"
          ></el-avatar>
          <p>点击修改头像</p></label>
        <input id="file" type="file" hidden ref="file" @change="onFileChange">
      </el-col>
    </el-row>
  </el-card>
  <el-dialog
    width="30%"
    title="修改头像"
    :visible.sync="dialogVisible"
    append-to-body
    @opened="onDialogOpened"
  >
    <div class="preview-image-wrap">
      <img class="preview-image" :src="previeImage" ref="preview-image">
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'SettingsIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false, // 控制图片预览显示
      previeImage: ''
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      // 处理图片预览
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previeImage = blobData
      // 展示弹出层，图片预览
      this.dialogVisible = true
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      // img必须是可见状态才能完成初始化
      // 获取图片节点
      const image = this.$refs['preview-image']
      // 初始化裁切器
      const cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop (event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
          console.log(event.detail.rotate)
          console.log(event.detail.scaleX)
          console.log(event.detail.scaleY)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.preview-image-wrap {
  /* Ensure the size of the image fit the container perfectly */
  .preview-image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
</style>
