import request from '@/utils/request'
// 获取个人信息
export function knowledgeList(data) {
  return request({
    url: '/dbinfo/statistics/listPoint',
    method: 'get',
    params: data
  })
}
