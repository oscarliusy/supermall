<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :probe-type="3">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem,
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
    //当添加新商品后，scroll需要刷新高度
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
/* calc注意运算符号前后要有空格 */
  .cart-list {
    height:calc(100vh - 44px - 49px - 40px);
  }
  .content {
    height:100%;
    overflow: hidden;
  }
  .content li {
    font-size: 24px;
  }
</style>