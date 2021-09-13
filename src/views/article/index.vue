<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
<!--        面包屑导航ending-->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="medium">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        筛选结果一共1024条：
      </div>
      <!--    数据列表    -->
      <el-table
        :data="articles"
        stripe
        size="medium"
        style="width: 100%"
        class="list-table">
        <el-table-column
          prop="date"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
<!--      如果要在自定义列表模板中获取遍历项数据，需要在template上声明slot-scope="scope"-->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
<!--            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>-->
<!--            <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>-->
<!--            <el-tag type="danger" v-else-if="scope.row.status === 3">审核失败</el-tag>-->
<!--            <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              size="medium"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--    列表分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
 
</template>

<script>
import { getArticles } from '../../api/article'

export default {
  name: 'index',
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'warning' }, // index=0 status正好和index对应
        { status: 1, text: '待审核' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      getArticles().then(res => {
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-top: 30px;
}
.list-table {
  margin-bottom: 20px;
}
</style>
