<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'
import CartBottomBar from './childComps/CartBottomBar'
import CartList from './childComps/CartList'
import { mapGetters } from 'vuex'


export default {
  name:'Shopcart',
  data(){
    return {
    }
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed:{
    //第一种用法，直接使用
    //...mapGetters(['cartLength','cartList'])
    //第二种用法,起别名
    ...mapGetters({
      length:'cartLength',
    })
  },
  methods:{
  }
}
</script>

<style scoped>
.cart {
  height:100vh;
}
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
}
</style>