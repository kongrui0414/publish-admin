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
      <el-col :span="12" offset=2>
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
      <el-col offset=5 :span="4">
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
    @closed="onDialogClosed"
  >
    <div class="preview-image-wrap">
      <img class="preview-image" :src="previewImage" ref="preview-image">
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button
      type="primary"
      :loading="updatePhotoLoading"
      @click="onUpdatePhoto"
    >确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import { getUserProfile, updateUserPhoto } from '@/api/user'
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
      previewImage: '',
      cropper: null,
      updatePhotoLoading: false
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
      this.previewImage = blobData
      // 展示弹出层，图片预览
      this.dialogVisible = true
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      // img必须是可见状态才能完成初始化
      // 获取图片节点
      const image = this.$refs['preview-image']
      // 初始化完裁切器，如果图片发生变化，裁切器默认不更新
      // 解决图片不更新：
      // 方法一：裁切器.replace 方法
      // 方法二：销毁裁切器，重新初始化
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      // 初始化裁切器
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        cropBoxResizable: false
        // 移动裁切器，调用 crop 方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    onDialogClosed () {
      // 对话框关闭，销毁裁切器
      // this.cropper.destroy()
    },
    onUpdatePhoto () {
      this.updatePhotoLoading = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像
        updateUserPhoto(fd).then(res => {
          console.log(res)
          // 关闭对话框
          this.dialogVisible = false
          // 更新视图展示
          // 把服务端返回的图片请求显示有点慢
          // this.user.photo = res.data.data.photo
          // 直接把裁切结果转为blob数据本地预览
          this.user.photo = window.URL.createObjectURL(file)
          // 关闭loading
          this.updatePhotoLoading = false
          this.$message({
            type: 'success',
            message: '更新头像成功'
          })
        })
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
    height: 300px;
  }
}
</style>
