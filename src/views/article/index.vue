<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      <!--面包屑导航ending-->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="medium">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!--el-radio默认把label作为文本和选中之后的value-->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              label="全部"
              value="null"
            ></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
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
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        筛选结果一共{{totalCount}}条结果：
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
          <template slot-scope="scope">
<!--            如果是本地图片，就要用v-if渲染-->
<!--            <img v-if="scope.row.cover.images[0]"-->
<!--                 class="article-cover"-->
<!--                 :src="scope.row.cover.images[0]">-->
<!--            在运行期间动态加载就可以直接用 || 判断-->
            <img :src="scope.row.cover.images[0] || 'https://img2.baidu.com/it/u=1428649624,1555131805&fm=26&fmt=auto&gp=0.jpg'" class="article-cover">
          </template>
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
        :total="totalCount"
        :page-size="pageSize"
        @current-change="onCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels } from '../../api/article'

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
      ],
      totalCount: 0, // 总数据条数
      pageSize: 20,
      status: null, // 查询文章的状态，不传就是全部
      channels: [],
      channelId: null
    }
  },
  created () {
    this.loadChannels()
    this.loadArticles()
  },
  methods: {
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
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
.article-cover {
  width: 200px;
  background-size: cover;
}
</style>
