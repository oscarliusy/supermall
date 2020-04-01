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

const getDate = (date,uFormat='YYYY-MM-DD HH:mm:ss') =>{
  moment.locale('zh-cn')
  return moment(date).format(uFormat)
}

const dateFormat = (timestamp,fmt) =>{
  let date = new Date(timestamp)
  //匹配fmt中是否有1-多个y
  if(/(y+)/.test(fmt)){
    //RegExp.$1是匹配结果，将其替换成计算出的年份，根据y的个数保留几位
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
  }
  let o ={
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }

  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      //将str转为字符串
      let str=o[k] + ''
      //匹配后，补0显示
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

const padLeftZero=(str)=>{
  return ('00'+str).substr(str.length)
}

export {
  debounce,
  getDate,
  dateFormat
}