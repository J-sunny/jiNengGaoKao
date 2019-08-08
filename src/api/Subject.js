import request from '@/utils/request'
// 根据搜索关键字和分页条件获取科目列表
export function subjectListByKeyword(data) {
  return request({
    url: '/dbinfo/subject/listByKeyword',
    method: 'get',
    params: data
  })
}
// 根据科目id删除科目
export function subjectDelete(data) {
  return request({
    url: '/dbinfo/subject/delete',
    method: 'get',
    params: data
  })
}
// 保存或者修改科目
export function subjectSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/subject/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
// 根据科目id查询知识点列表(带子知识点)
export function knowledgePointListBySubjectId(data) {
  return request({
    url: '/dbinfo/knowledgePoint/listBySubjectId',
    method: 'get',
    params: data
  })
}
// 保存知识点
export function knowledgePointSave(data) {
  return request({
    url: '/dbinfo/knowledgePoint/save',
    method: 'POST',
    data: data
  })
}
// 保存子知识点
export function childSave(data) {
  return request({
    url: '/dbinfo/knowledgePoint/child/save',
    method: 'POST',
    data: data
  })
}
// 删除知识点
export function knowledgePointDelete(data) {
  return request({
    url: '/dbinfo/knowledgePoint/delete',
    method: 'get',
    params: data
  })
}
// 删除子知识点
export function knowledgePointChildDelete(data) {
  return request({
    url: '/dbinfo/knowledgePoint/child/delete',
    method: 'get',
    params: data
  })
}
// 模拟考试详细统计-分页获取统计信息
export function releaseDetail(data) {
  return request({
    url: '/dbinfo/statistics/releaseDetail',
    method: 'get',
    params: data
  })
}
// 点击批阅，修改批阅状态为：批阅中
export function startReview(data) {
  return request({
    url: '/dbinfo/review/startReview',
    method: 'get',
    params: data
  })
}
// 按发布id查询发布记录
export function releaseget(data) {
  return request({
    url: '/dbinfo/release/get',
    method: 'get',
    params: data
  })
}
