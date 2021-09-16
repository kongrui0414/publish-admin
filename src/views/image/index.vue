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
    <div style="padding-bottom: 20px">
      <el-radio-group
        v-model="collect"
        size="medium"
        @change="onCollectChange"
      >
        <el-radio-button
          :label="false"
        >全部</el-radio-button>
        <el-radio-button
          :label="true"
        >收藏</el-radio-button>
      </el-radio-group>
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
  </el-card>
</div>
</template>

<script>
import { getImages } from '@/api/image'

export default {
  name: 'ImageIndex',
  data () {
    return {
      collect: false,
      images: []
    }
  },
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages (collect = false) {
      getImages({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    }
  }
}
</script>

<style scoped>

</style>
