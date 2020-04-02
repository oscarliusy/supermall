export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  allChecked(state){
    let cartLength = state.cartList.length
    let checkedLength = state.cartList.filter(item=>item.isChecked).length
    if(cartLength === checkedLength){
      return true
    }else{
      return false
    }
  }
}
