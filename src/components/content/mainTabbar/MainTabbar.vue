<template>
     <tab-bar >
      <tab-bar-item  path="/home" activeColor="blue">
        <img slot="item-icon" src="@img/tabbar/home.jpg" alt="home">  
        <img slot="item-icon-active" src="@img/tabbar/home-active.jpg" alt="home">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="yellow">
        <img slot="item-icon" src="@img/tabbar/category.jpg" alt="category">
        <img slot="item-icon-active" src="@img/tabbar/category-active.jpg" alt="category">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart" activeColor="green">
        <img slot="item-icon" src="@img/tabbar/shopcart.jpg" alt="home">
        <img slot="item-icon-active" src="@img/tabbar/shopcart-active.jpg" alt="home">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="red">
        <img slot="item-icon" src="@img/tabbar/profile.jpg" alt="home">
        <img slot="item-icon-active" src="@img/tabbar/profile-active.jpg" alt="home">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '@components/common/tabbar/TabBar'
import TabBarItem from '@components/common/tabbar/TabBarItem'
export default {
  name:'MainTabbar',
  components:{
    TabBar,
    TabBarItem
  }

}
</script>

<style>

</style>