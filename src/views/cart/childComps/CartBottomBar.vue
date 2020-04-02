<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-bottom" @click.native="checkClick" :is-checked="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">去计算:{{checkedLength}}</div>
  </div>
</template>

<script>
import CheckButton from '@components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'
export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList','allChecked']),
    totalPrice(){
      return this.cartList.filter(item=>{
        return item.isChecked
      }).reduce((preValue,item)=>{
        return preValue + item.price*item.count
      },0).toFixed(2)
    },
    checkedLength(){
      return this.cartList.filter(item=>item.isChecked).length
    },
    isSelectAll(){
      //无数据时为false
      if(this.cartList.length === 0 ) return false
      
      //方法1：遍历整个list，效率较低
      //return !(this.cartList.filter(item => !item.isChecked).length)

      //方法2：找到未选中的就返回，计算量减小      
      return !(this.cartList.find(item=>!item.isChecked))
    }
  },
  methods:{
    checkClick(){
      // let that = this
      // this.allChecked = !that.allChecked
      // this.$store.dispatch('toggleAllChecked')
      if(this.isSelectAll){//全部选中
        this.cartList.forEach(item => item.isChecked = false)
      }else {//部分选中或全部不选中
        this.cartList.forEach(item => item.isChecked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  line-height: 40px;
  height: 40px;

  background-color: #eee;

}

.check-content{
 display:flex;
 align-items: center;
 margin-left:5px;
 width:90px;
}

.check-bottom {
  width:20px;
  height:20px;
  line-height: 20px;
  margin-right:5px;
}

.price {
  margin-left: 30px;
  flex:1;
}

.calculate {
  width:90px;
  background-color: orangered;
  color:#fff;
  text-align: center;
}
</style>