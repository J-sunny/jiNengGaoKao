import request from '@/utils/request'
//获取子知识点下拉列表
export function knowledgePointGet(data) {
  return request({
    url: '/dbinfo/knowledgePoint/child/listByParentId',
    method: 'get',
    params: data
  })
}
// 按分页条件和查询条件查询题目
export function questionListByKeyword(data) {
  return request({
    url: '/dbinfo/question/listByKeyword',
    method: 'get',
    params: data
  })
}
// 按id删除批量题目,假删除
export function questionDelete(data) {
  return request({
    url: '/dbinfo/question/deleteBatch',
    method: 'get',
    params: data
  })
}
// 有id的时候为修改，没有id的时候增加
export function questionSaveOrUpdate(data) {
  return request({
    url: '/dbinfo/question/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
// 综合题提交子题
export function saveOrUpdateBatch(data) {
  return request({
    url: '/dbinfo/question/saveOrUpdateBatch',
    method: 'POST',
    data: data
  })
}
// 按id查询题目
export function questionGet(data) {
  return request({
    url: '/dbinfo/question/get',
    method: 'get',
    params: data
  })
}
