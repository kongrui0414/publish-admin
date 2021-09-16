<template>
<div class="publish-container">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--    面包屑导航-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form
      :model="article"
      :rules="formRules"
      label-width="60px"
      ref="publish-form"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-tiptap
          lang="zh"
          v-model="article.content"
          :extensions="extensions"
          height="400"
          placeholder="请输入文章内容"
        ></el-tiptap>
<!--        <quill-editor-->
<!--          ref="myQuillEditor"-->
<!--          v-model="article.content"-->
<!--          :options="editorOption"-->
<!--          @blur="onEditorBlur($event)"-->
<!--          @focus="onEditorFocus($event)"-->
<!--          @ready="onEditorReady($event)"-->
<!--        />-->
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select
          v-model="article.channel_id"
          placeholder="请选择频道">
          <el-option
            :label="channel.name"
            :value="channel.id"
            v-for="(channel, index) in channels"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish(false)">发表</el-button>
        <el-button @click="onPublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Preview,
  Fullscreen,
  Image,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
import { uploadImage } from '../../api/image'
import 'element-tiptap/lib/index.css'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
    // quillEditor
  },
  props: {},
  data () {
    return {
      channels: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new TextColor(),
        new Strike(),
        new CodeBlock(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>' || value === '') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          },
          { required: true }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  created () {
    this.loadChannels()
    // 要判断路由路径参数中有无 id ，来决定是发布还是修改
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods: {
    loadChannels () {
      getArticleChannels().then(({ data: { data } }) => {
        this.channels = data.channels
      })
    },
    onPublish (draft = false) {
      this.$refs['publish-form'].validate(valid => {
        // 验证失败，停止提交表单
        if (!valid) {
          
        }
      })
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单
      // 判断是修改文章还是发布文章（因为用的是同一组件）
      const articleId = this.$route.query.id
      if (articleId) {
        // 修改
        updateArticle(articleId, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 跳转到内容管理页面
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 跳转到内容管理页面
          this.$router.push('/article')
        })
      }
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  }
}
</script>

<style scoped>

</style>
