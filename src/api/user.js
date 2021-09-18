// 用户相关请求模块

// 用户登录
import request from '../utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user)
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端把要授权的用户身份放到请求头中
    // headers: {
    //   // 属性名: Authorization
    //   // 属性值：Bearer空格token数据
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
// 修改用户信息
// export const updateUser = () => {

// }

// 修改用户头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
