<template>
  <div id="app">
    <keep-alive exclude="detail">
      <!-- 排除detail，不然详情页的数据不会改变 -->
    <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
