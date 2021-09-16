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
      <el-radio-group v-model="radio1" size="medium">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
    </div>
    <el-row :gutter="10">
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
      <el-col :lg="4" :md="6" :xs="12">
        <el-image
          style="min-width: 200px; height: 150px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="cover"></el-image>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'ImageIndex',
  data () {
    return {
      radio1: '全部'
    }
  }
}
</script>

<style scoped>

</style>
