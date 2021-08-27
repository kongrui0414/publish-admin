<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="200px">
      <AppAside class="aside-menu"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i>
          库里后台管理系统
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img
              class="avatar"
              :src="user.photo"
              alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!--  子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
  <!--<div class="layout-container">-->
  <!--  <div>顶部导航栏</div>-->
  <!--&lt;!&ndash;  子路由出口 &ndash;&gt;-->
  <!--  -->
  <!--  <div>侧边导航栏</div>-->
  <!--  <router-view/>-->
  <!--</div>-->
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '../../api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {} // 当前登录信息
    }
  },
  created () {
    // 组件初始化后获取用户资料
    this.loadUserProfile()
  },
  methods: {
    // 除了登录，其他接口都要提供身份才能获取数据
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
        console.log('res here')
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.aside {
  width: 200px;
  background-color: #D3DCE6;
}

.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.main {
  background-color: #E9EEF3;
}

.aside-menu {
  height: 100%;
}
.avatar-wrap {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
