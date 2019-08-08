import request from '@/utils/request'

export function login(data) {
  data.userType = '1'
  return request({
    // url: '/user/login',
    url: '/loginByAccount',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/getRoles',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/loginOut',
    method: 'get'
  })
}
export function cacheText(data) {
  return request({
    url: '/dbinfo/JXZcontroller/cacheText',
    method: 'post',
    data: data
  })
}
export function getText(data) {
  return request({
    url: '/dbinfo/JXZcontroller/getText',
    method: 'get',
    params: data
  })
}
export function updatePhoto(data) {
  return request({
    url: '/updatePhoto',
    method: 'get',
    params: data
  })
}
