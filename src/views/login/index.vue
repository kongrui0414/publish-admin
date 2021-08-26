<template>
  <div class="login-container">
    <div class="login-head">

    </div>
    <el-form class="login-form" ref="form" :model="user">
      <el-form-item>
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">我已阅读并统一用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false,
      loginLoading: false
    }
  },
  computed: {},
  methods: {
    onLogin () {
      // 获取表单数据
      const user = this.user

      // 表单验证

      // 验证通过
      this.loginLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.loginLoading = false
        console.log(res)
      }).catch(err => {
        this.$message.error('登录失败')
        // 关闭loading
        this.loginLoading = false
        console.log(err)
      })
      // 处理后端响应结果
    }
  }
}
</script>

<style scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
}

.login-form {
  background-color: #fff;
  padding: 50px;
  min-width: 300px;
}
.login-btn {
  width: 100%;
}
.login-head {
  margin-bottom: 30px;
  width: 300px;
  height: 57px;
  background: url("./logo_index.png") no-repeat;
}
</style>
