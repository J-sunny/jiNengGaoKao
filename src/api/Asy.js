import request from '@/utils/request'
// 获取个人信息
export function getTeacherInfo(data) {
  return request({
    url: '/dbinfo/teacher/list',
    method: 'get',
    params: data
  })
}
// 根据科目分类获取易错知识点前三名信息
export function getPointBySubject(data) {
  return request({
    url: '/dbinfo/statistics/listPointBySubject',
    method: 'get',
    params: data
  })
}

// 修改用户密码
export function updatePassword(data) {
  return request({
    url: '/updatePassword',
    method: 'get',
    params: data
  })
}
