import request from '@/utils/request'
// 知识点-分页获取统计信息
export function statisticsListPoint(data) {
  return request({
    url: '/dbinfo/statistics/listPoint',
    method: 'get',
    params: data
  })
}
// 错题-分页获取统计信息
export function statisticslistQuestion(data) {
  return request({
    url: '/dbinfo/statistics/listQuestion',
    method: 'get',
    params: data
  })
}
// 模拟考试统计-分页获取统计信息
export function statisticslistRelease(data) {
  return request({
    url: '/dbinfo/statistics/listRelease',
    method: 'get',
    params: data
  })
}
