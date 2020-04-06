export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  allChecked(state,getters){
    let cartLength = getters.cartLength
    let checkedLength = state.cartList.filter(item=>item.isChecked).length
    if(cartLength === checkedLength){
      return true
    }else{
      return false
    }
  }
}
