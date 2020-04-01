// 这里是vuex的唯一入口，将actions,mutations都抽出去
// 仅保留state，便于管理

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  cartList:[]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
})

export default store