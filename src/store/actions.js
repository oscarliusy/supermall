// actions中定义异步和较为复杂的方法
// actions不能直接修改state，只能通过commit的方式使用mutations修改

import mutationTypes from './mutation-types'

export default  {
  addCart(context,payload){
    //判断加入的商品是否存在，如果存在，则数量+1，如果不存在，则增加属性count=1，并push进来
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if(oldProduct){
      // oldProduct.count += 1
      context.commit(mutationTypes.ADD_COUNTER,oldProduct)
    }else{
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(mutationTypes.ADD_TO_CART,payload)
    }
  }
}