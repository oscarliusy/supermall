import axios from 'axios'

export const request=(config)=>{
  const instance = axios.create({
    //baseURL: 'http://123.207.32.32:8000',
    //baseURL: 'http://106.54.54.237:8000/api/wh',
    baseURL: 'http://123.207.32.32:8000/api/h8',
    timeout: 5000
  })

  instance.interceptors.request.use(config=>{
    return config
  },err =>{

  })

  instance.interceptors.response.use(res=>{
    return res.data
  },err =>{
    console.log(err)
  })

  return instance(config)
}

export const requestRap2 = (config) =>{
  const instanceRap2 = axios.create({
    baseURL:'http://rap2.taobao.org:38080/app/mock/249676',
    timeout: 5000
  })

  instanceRap2.interceptors.request.use(config=>{
    return config
  },err =>{

  })

  instanceRap2.interceptors.response.use(res=>{
    return res.data.data
  },err =>{
    console.log(err)
  })

  return instanceRap2(config)
}