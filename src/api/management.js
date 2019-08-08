import request from '@/utils/request'
// 根据分页条件和查询条件获取教材列表
export function teachingMaterialListByKeyword(data) {
  return request({
    url: '/dbinfo/teachingMaterial/listByKeyword',
    method: 'get',
    params: data
  })
}
// 删除教材
export function teachingMaterialDelete(data) {
  return request({
    url: '/dbinfo/teachingMaterial/delete',
    method: 'get',
    params: data
  })
}
// 根据教材id查询章节和子章节
export function listByMaterialId(data) {
  return request({
    url: '/dbinfo/teachingMaterial/chapter/listByDetail',
    method: 'get',
    params: data
  })
}
// 根据教材id查询章节
export function teachingMaterial(data) {
  return request({
    url: '/dbinfo/teachingMaterial/saveOrUpdate',
    method: 'get',
    params: data
  })
}
// 多个教材批量绑定一个科目
export function BindSubjectBatch(data) {
  return request({
    url: '/dbinfo/teachingMaterial/BindSubjectBatch',
    method: 'get',
    params: data
  })
}
// 保存章节
export function chapterSave(data) {
  return request({
    url: '/dbinfo/teachingMaterial/chapter/save',
    method: 'post',
    data: data
  })
}
// 根据id删除章节
export function chapterDelete(data) {
  return request({
    url: '/dbinfo/teachingMaterial/chapter/delete',
    method: 'get',
    params: data
  })
}
// 保存子章节
export function childChapterSave(data) {
  return request({
    url: '/dbinfo/teachingMaterial/childChapter/save',
    method: 'post',
    data: data
  })
}
// 根据id删除子章节
export function childChapterDelete(data) {
  return request({
    url: '/dbinfo/teachingMaterial/childChapter/delete',
    method: 'get',
    params: data
  })
}
// 根据科目id查询知识点列表
export function listBySubjectIdnot(data) {
  return request({
    url: '/dbinfo/knowledgePoint/listBySubjectIdnot',
    method: 'get',
    params: data
  })
}
// 根据知识点id获取一条知识点数据
export function knowledgePoint(data) {
  return request({
    url: '/dbinfo/knowledgePoint/child/listByParentId',
    method: 'get',
    params: data
  })
}
// 分页查询试卷库多条件
export function examlistByKeyword(data) {
  return request({
    url: '/dbinfo/exam/listByKeyword',
    method: 'get',
    params: data
  })
}
// 按发布id查询参与此次考试的学生
export function getStudentByReleaseId(data) {
  return request({
    url: '/dbinfo/release/getStudentByReleaseId',
    method: 'get',
    params: data
  })
}
