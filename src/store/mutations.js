/*
*所有的对state的修改都定义在mutations中
*这里仅定义同步方法
*所有的方法名都从mutationTypes导入，便于各文件统一
*每个方法仅完成一件事情
*/
import mutationTypes from './mutation-types'

export default  {
  [mutationTypes.ADD_COUNTER](state,payload){
    payload.count += 1
  },
  [mutationTypes.ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  },
  [mutationTypes.TOGGLE_CHECKED](state,payload){
    state.cartList.map(item=>{
      if(item.iid === payload.iid){
        item.isChecked = !item.isChecked
        return item
      }
    })
  },
  [mutationTypes.ALL_CHECKED](state){
    state.cartList.map(item => item.isChecked = true)
  },
  [mutationTypes.ALL_UNCHECKED](state){
    state.cartList.map(item => item.isChecked = false)
  }
}