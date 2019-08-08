import request from '@/utils/request'
// 分页查询试卷库多条件
export function listByKeyword(data) {
  return request({
    url: '/dbinfo/exam/listByKeyword',
    method: 'get',
    params: data
  })
}
// 按分页条件和查询条件查询题目
export function questionlistByKeyword(data) {
  return request({
    url: '/dbinfo/question/listByCreatePaper',
    method: 'get',
    params: data
  })
}
// 新增或者修改试卷
export function examSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/exam/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
// 发布考试
export function releaseSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/release/save',
    method: 'POST',
    data: data
  })
}
// 查询发布记录
export function listByKeywordes(data) {
  return request({
    url: '/dbinfo/release/list',
    method: 'get',
    params: data
  })
}
// 教师查询发布记录（批阅记录）
export function releaselistByReview(data) {
  return request({
    url: '/dbinfo/release/listByKeyword',
    method: 'get',
    params: data
  })
}
// 按发布id查询题目
export function releaseIdsByReleaseId(data) {
  return request({
    url: '/dbinfo/release/idsByReleaseId',
    method: 'get',
    params: data
  })
}
// APP批阅查询,一个题目
export function reviewget(data) {
  return request({
    url: '/dbinfo/review/get',
    method: 'get',
    params: data
  })
}
// 教师批阅题目
export function reviewread(data) {
  return request({
    url: '/dbinfo/review/read',
    method: 'POST',
    data: data
  })
}
// 教师批阅完一个学生
export function readOneStudentOver(data) {
  return request({
    url: '/dbinfo/review/readOneStudentOver',
    method: 'get',
    params: data
  })
}
// 按id删除批量试卷,假删除
export function deleteBatch(data) {
  return request({
    url: '/dbinfo/exam/deleteBatch',
    method: 'get',
    params: data
  })
}
