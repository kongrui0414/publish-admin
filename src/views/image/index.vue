<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="action-head">
        <el-radio-group
          v-model="collect"
          size="medium"
          @change="onCollectChange"
        >
          <el-radio-button
            :label="false"
          >全部
          </el-radio-button>
          <el-radio-button
            :label="true"
          >收藏
          </el-radio-button>
        </el-radio-group>
        <el-button
          size="medium"
          type="success"
          @click="dialogUploadVisible = true"
        >上传素材
        </el-button>
      </div>
      <el-row :gutter="10">
        <el-col
          :lg="4"
          :md="6"
          :xs="12"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image
            style="min-width: 200px; height: 150px"
            :src="img.url"
            :fit="cover"></el-image>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="onPageChange"
        :current-page.sync="page"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        with-credentials="true"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image'

export default {
  name: 'ImageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 20,
      page: 1
    }
  },
  created () {
    this.loadImages(1)
  },
  methods: {
    loadImages (page = 1) {
      getImages({
        collect: this.collect,
        page,
        per_age: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(1)
    },
    onPageChange (page) {
      console.log(page)
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
