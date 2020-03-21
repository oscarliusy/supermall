import { request } from  './request'

export const getHomeMultidata=()=>{
  return request({
    url:'/home/multidata'
  })
}