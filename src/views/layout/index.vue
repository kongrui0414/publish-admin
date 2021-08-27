<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="200px">
      <AppAside class="aside-menu"/>
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
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
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
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
  background-color: #B3C0D1;
}

.main {
  background-color: #E9EEF3;
}
.aside-menu {
  height: 100%;
}
</style>
