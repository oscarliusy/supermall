<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name:'Scroll',
    data(){
      return {
        scroll:null,
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      }
    },
    mounted(){
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType
      })
      
      //监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })

    },
    methods:{
      scrollTo(x=0,y=0,time=300){
        this.scroll.scrollTo(x,y,time)
      },
    },
  }
</script>

<style scoped>

</style>