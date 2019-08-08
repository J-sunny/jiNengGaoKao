import request from '@/utils/request'
// 根据分页条件获取专业列表
export function professionlist(data) {
  return request({
    url: '/dbinfo/profession/list',
    method: 'get',
    params: data
  })
}
// 保存或者修改专业
export function professionSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/profession/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
// 根据班级id删除专业
export function professionDelete(data) {
  return request({
    url: '/dbinfo/profession/delete',
    method: 'get',
    params: data
  })
}
// 根据搜索关键字和分页条件获取班级列表
export function classListByKeyword(data) {
  return request({
    url: '/dbinfo/class/listByKeyword',
    method: 'get',
    params: data
  })
}
// 保存或者修改班级
export function classSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/class/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
// 根据班级id删除班级
export function classDelete(data) {
  return request({
    url: '/dbinfo/class/delete',
    method: 'get',
    params: data
  })
}
// 根据分页条件获取教师列表
export function teacherList(data) {
  return request({
    url: '/dbinfo/teacher/list',
    method: 'get',
    params: data
  })
}
// 保存或者修改教师
export function teacherSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/teacher/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
// 根据教师id删除教师
export function teacherDelete(data) {
  return request({
    url: '/dbinfo/teacher/delete',
    method: 'get',
    params: data
  })
}
// 根据分页条件和查询条件获取学生列表
export function studentListByKeyword(data) {
  return request({
    url: '/dbinfo/student/listByKeyword',
    method: 'get',
    params: data
  })
}
// 保存或者修改学生
export function studentSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/student/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
// 根据学生id删除学生
export function studentDelete(data) {
  return request({
    url: '/dbinfo/student/delete',
    method: 'get',
    params: data
  })
}
// 根据搜索关键字和分页条件获取角色信息
export function permissionListByKeyword(data) {
  return request({
    url: '/dbinfo/permission/listByKeyword',
    method: 'get',
    params: data
  })
}
