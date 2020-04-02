// 这里是vuex的唯一入口，将actions,mutations都抽出去
// 仅保留state，便于管理

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList:[
    {
      isChecked:true,
      count:2,
      desc:"【2件69元】【新品特惠】【赠送运费险 七天无理由退换货】【无忧售后】",
      iid:"1lrzvr8",
      image:"//s11.mogucdn.com/mlcdn/c45406/180301_1cik8f3fj0gf2839ddch880422ffc_640x960.jpg",
      price:"49.00",
      title:"【2件69元】【新品特惠】短袖t恤女2018夏装新款韩版学生宽松黑色体恤圆领纯棉半袖上衣服"
    },
    {
      isChecked:true,
      count:1,
      desc:"简约而不简单的T恤，\n\n莫过于什么元素都别用，就是一身纯色，\n\n如此简单，却百搭得不行，\n\n搭配衣服的颜色毫无挑剔，\n\n穿出清爽怡人好心情，你心动了吗？\nS码：100斤以下 M码：100-110斤  L码：110-125斤  XL码：125-135斤",
      iid:"1lyp2vg",
      image:"//s11.mogucdn.com/mlcdn/c45406/180423_0h6j2abd17hka9d4j7dlk710d3af9_640x960.jpg",
      price:"39.00",
      title:"2018春夏季新款八色纯色浅色系时尚简约韩范纯棉学生休闲百搭基础款纯色圆领短袖上衣女T恤"
    },
    // {
    //   isChecked:true,
    //   count:2,
    //   desc:"特意为秋冬时候准备的一款 显瘦遮身的好裤子  上身穿起来不像牛仔裤那样紧身 也不像运动裤那样尴尬，可以说是即好穿又有型的款式 条纹的设计 自然舒适  穿起来没有束缚感哦 两侧的口袋也简约实用 放上一个手机也是绰绰有余",
    //   iid:"1m8zmoa",
    //   image:"//s11.mogucdn.com/mlcdn/c45406/180925_06bdcgaadl6i1921ch3ll4038i0dd_640x960.jpg",
    //   price:"55.00",
    //   title:"【秋冬加厚】灯芯绒2018新品百搭休闲裤女韩版毛呢裤子高腰显瘦宽松九分哈伦裤条纹大码小脚裤"
    // },
    // {
    //   isChecked:true,
    //   count:3,
    //   desc:"新品",
    //   iid:"1m8loki",
    //   image:"//s5.mogucdn.com/mlcdn/c45406/180916_4di1ek7k3kha3klk02185678b025d_640x960.jpg",
    //   price:"54.00",
    //   title:"中长款长袖连衣裙秋装新款2018韩版休闲胖mm大码女装裙子女学生宽松松垮垮中长款卫衣裙外套"
    // },
    // {
    //   isChecked:true,
    //   count:1,
    //   desc:"2018春秋季新款女装韩版宽松短袖t恤女chic半袖打底条纹体恤上衣",
    //   iid:"1m11u6e",
    //   image:"//s11.mogucdn.com/mlcdn/c45406/180512_8ei0ck7535c2l4dcj96cllieca561_640x960.jpg",
    //   price:"35.00",
    //   title:"2018春秋季新款女装韩版宽松短袖t恤女chic半袖打底条纹体恤上衣"
    // },
    // {
    //   isChecked:true,
    //   count:1,
    //   desc:"【多款可选】时尚新颖！卡通可爱猫咪印花！赠送运费险！本店默认中通快递！",
    //   iid:"1lvf1qw",
    //   image:"//s3.mogucdn.com/mlcdn/c45406/180423_54e410ebffkj73cah5e513584b5fb_800x800.jpg",
    //   price:"52.00",
    //   title:"长袖/短袖T恤女2018新款棉质学生宽松韩版夏季可爱卡通猫咪印花纯色百搭打底衫上衣女潮"
    // },
  ]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store