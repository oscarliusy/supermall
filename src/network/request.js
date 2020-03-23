import axios from 'axios'

export const request=(config)=>{
  const instance = axios.create({
    //baseURL: 'http://123.207.32.32:8000',
    //baseURL: 'http://106.54.54.237:8000/api/wh',
    baseURL: 'http://123.207.32.32:8000/api/wh',
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