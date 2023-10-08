import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串 并且每次执行不能发生变化 游客身份持久存储
export const getUUID=()=> {
  // 从本地存储获取uuid 判断本地存储中是否存在
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果没有 生成临时身份 进行本地存储
  if ( !uuid_token ) {
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}