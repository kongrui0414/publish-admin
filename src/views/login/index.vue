<template>
  <div class="login-container">
    <div class="login-head">

    </div>
    <!--
      配置Form表单验证
      1. 必须给 el-form 组件绑定 model 为表单数据对象
      2. 给需要验证的表单项 el-form-item 绑定 prop 属性
      3. 给 el-form 组件的 rules 属性配置验证规则

      手动触发表单验证
      1. 给 el-for 设置 ref 起个名字
      2. 通过 ref 获得 el-form 组件，调用组件的 validate 进行验证
    -->
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并统一用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
        >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '../../api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoading: false,
      formRules: {
        // 要验证的数据名称，就是prop
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '请输入正确的号码格式',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证码',
            trigger: 'blur'
          }
        ],
        agree: [
          {
            // 自定义校验规则
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('err'))
              }
            },
            message: '请勾选同意用户协议',
            triangle: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  methods: {
    onLogin () {
      // 获取表单数据
      // const user = this.user

      // 表单验证
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败
        if (!valid) {
          return
        }

        // 验证通过
        this.login()
      })

      // 处理后端响应结果
    },
    login () {
      this.loginLoading = true
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        
        // 关闭loading
        this.loginLoading = false
        console.log(res)
        
        // 跳转到首页
        this.$router.push('/')
      }).catch(err => {
        this.$message.error('登录失败')
        // 关闭loading
        this.loginLoading = false
        console.log(err)
      })
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
