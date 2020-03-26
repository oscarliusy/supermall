import moment from 'moment'

//防抖函数
const debounce = (func,delay=500) => {
  let timer = null
  return function(...args){
    //在delay时间内如果发现有以前的定时器，将其清除
    if(timer) clearTimeout(timer)
    //创建定时器，delay后，调用传入的函数及其参数。
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

const getDate = (date) =>{
  moment.locale('zh-cn')
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
export {
  debounce,
  getDate,
}