<template>
  <div class="box_r">
    <div class="wpr">
      <div class="top">
        <a href="#/release"><i class="el-icon-d-arrow-left" /> 返回</a>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="作业名称:">
          <el-input v-model="title" type="text" size="mini" />
        </el-form-item>
        <el-form-item label="科目:">
          <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
            <el-option
              v-for="item in kemuList"
              :key="item.subjectId"
              :label="item.subjectName"
              :value="item.subjectId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教材">
          <el-select v-model="teachingMaterialId" size="mini" placeholder="请选择教材">
            <el-option v-for="item in jiaocaiList" :label="item.teachingMaterialName" :value="item.teachingMaterialId" />
          </el-select>
        </el-form-item>
        <el-form-item label="章:">
          <el-select v-model="chapterId" size="mini" placeholder="请选择章">
            <el-option
              v-for="item in zhangjieList"
              :key="item.chapterId"
              :label="item.chapterName"
              :value="item.chapterId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="节:">
          <el-select v-model="childChapterId" size="mini" placeholder="请选择节">
            <el-option
              v-for="item in jieList"
              :key="item.childChapterId"
              :label="item.childChapterName"
              :value="item.childChapterId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="题型:">
          <div class="riod">
            <ul>
              <li v-for="item in riodList" :class="rideo==item.value?'ack':''" @click="rideo=item.value">{{ item.label }}
                <div class="duigou" />
                <div class="el-icon-check gou" />
              </li>
            </ul>
            <div class="fen">
              &nbsp;&nbsp;&nbsp;&nbsp;
              每题分值:
              <el-input
                v-model="morenfen"
                type="text"
                size="mini"
                class="ipt"
              />
              分
            </div>
          </div>
        </el-form-item>
        <div
          v-if="flages&zhishidianList.length!=0"
          class="modays"
          @click="flages=false,xianxiang2=[],xianxiang3=[]"
        />
        <el-form-item label="试题知识点:">
          <div class="set">
            <div class="iptsa">
              <div class="iptsas" @click="flages=true">
                <span class="tag"> <el-tag
                  v-for="(tag,index) in xianglixanglist"
                  :key="index"
                  size="mini"
                  closable
                  @close="shanchutag(index)"
                >
                  {{ tag.pointName }}
                </el-tag></span>

              </div>
              <span v-if="zhishidianList.length==0" class="zhankog">暂无数据</span>
              <i class="el-icon-arrow-down fr center" />
              <div v-if="flages&zhishidianList.length!=0" class="lists">
                <div class="lists1">
                  <ul>
                    <li
                      v-for="item in zhishidianList"
                      class="list"
                      @click="queren_(item)"
                      @mouseover="xuanxiang1(item)"
                    >{{ item.pointName }}
                    </li>
                  </ul>
                </div>
                <div v-if="xianxiang2.length!=0" class="lists2">
                  <ul>
                    <li v-for="item in xianxiang2" class="list" @click="queren_(item)" @mouseover="xuanxiang2_(item)">
                      {{ item.pointName }}
                    </li>
                  </ul>
                </div>
                <div v-if="xianxiang3.length!=0" class="lists3">
                  <ul>
                    <li v-for="item in xianxiang3" class="list" @click="queren_(item)">{{ item.pointName }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="选择试题:">
          <span class="li">（已选 <span class="yx">单选题{{ danxuanti.length }}题、多选题{{ duoxuanti.length }}题、填空题{{ tiankongti.length }}题、问答题{{ jianda.length }}题、综合题{{ zonghe.length }}题</span>）</span>
          <!--          <ul class="nu">-->
          <!--            <li class="nu1">批量删除</li>-->
          <!--            <li class="nu2">全选</li>-->
          <!--          </ul>-->
        </el-form-item>
        <el-form-item>
          <div class="xtk">
            <ul>
              <li v-for="(item,index) in danxuanlist" v-if="rideo==0">
                <p>{{ index+1 }}.<span class="tigan" v-html="item.questionTitle" />﻿</p>
                <div class="xiantiao" />
                <p class="xia"><span class="fl">难度系数：</span>
                  <el-rate v-model="item.diffcultLevel" class="xinx" disabled />
                  <span v-if="!item.flag" class="bt" @click="item.flag=!item.flag,item.fenshu=morenfen,danxuanti.push({item}),jisuanzongfen()"><i
                    class="el-icon-plus"
                  />选题</span>
                  <span v-if="item.flag" class="bt yichu" @click="item.flag=!item.flag,yichu(item.questionId),jisuanzongfen()"><i
                    class="el-icon-close"
                  />移除</span>
                </p>
              </li>

              <li v-for="(item,index) in duoxuantiList" v-if="rideo==1">
                <p>{{ index+1 }}.<span class="tigan" v-html="item.questionTitle" />﻿</p>
                <div class="xiantiao" />
                <p class="xia"><span class="fl">难度系数：</span>
                  <el-rate v-model="item.diffcultLevel" class="xinx" disabled />
                  <span v-if="!item.flag" class="bt" @click="item.flag=!item.flag,item.fenshu=morenfen,duoxuanti.push({item}),jisuanzongfen()"><i
                    class="el-icon-plus"
                  />选题</span>
                  <span v-if="item.flag" class="bt yichu" @click="item.flag=!item.flag,yichuduoxuan(item.questionId),jisuanzongfen()"><i
                    class="el-icon-close"
                  />移除</span>
                </p>
              </li>

              <li v-for="(item,index) in tiankongtiList" v-if="rideo==2">
                <p>{{ index+1 }}.<span class="tigan" v-html="item.questionTitle" />﻿</p>
                <div class="xiantiao" />
                <p class="xia"><span class="fl">难度系数：</span>
                  <el-rate v-model="item.diffcultLevel" class="xinx" disabled />
                  <span v-if="!item.flag" class="bt" @click="item.flag=!item.flag,item.fenshu=morenfen,tiankongti.push({item}),jisuanzongfen()"><i
                    class="el-icon-plus"
                  />选题</span>
                  <span
                    v-if="item.flag"
                    class="bt yichu"
                    @click="item.flag=!item.flag,yichutiankong(item.questionId),jisuanzongfen()"
                  ><i
                    class="el-icon-close"
                  />移除</span>
                </p>
              </li>

              <li v-for="(item,index) in jiandaiList" v-if="rideo==3">
                <p>{{ index+1 }}.<span class="tigan" v-html="item.questionTitle" />﻿</p>
                <div class="xiantiao" />
                <p class="xia"><span class="fl">难度系数：</span>
                  <el-rate v-model="item.diffcultLevel" class="xinx" disabled />
                  <span v-if="!item.flag" class="bt" @click="item.flag=!item.flag,item.fenshu=morenfen,jianda.push({item}),jisuanzongfen()"><i
                    class="el-icon-plus"
                  />选题</span>
                  <span v-if="item.flag" class="bt yichu" @click="item.flag=!item.flag,yichujianda(item.questionId),jisuanzongfen()"><i
                    class="el-icon-close"
                  />移除</span>
                </p>
              </li>

              <li v-for="(item,index) in zonghetiList" v-if="rideo==4">
                <div class="tigan" v-html="item.questionTitle" />
                <div class="xiantiao" />
                <div v-for="(val,index) in item.ziti">
                  <p>{{ index+1 }}.
                    <span v-if="val.questionType==0" class="timuz">[单选题]</span>
                    <span v-if="val.questionType==1" class="timuz">[多选题]</span>
                    <span v-if="val.questionType==2" class="timuz">[填空题]</span>
                    <span v-if="val.questionType==3" class="timuz">[问答题]</span>
                    <span class="tigan" v-html="val.questionTitle" />
                  </p>
                  <p class="input-number">
                    <span class="fl nandu">难度系数：<span class="pingfen"><el-rate
                      v-model="val.diffcultLevel"
                      class="xinx"
                      disabled
                    /></span></span>

                    设置该小题分数:
                    <el-input-number v-model="val.fenshu" size="mini" @change="xiaotifensu()" />
                  </p>
                  <div class="xiantiao" />
                </div>
                <div class="xiantiao" />
                <p class="xia">
                  <span v-if="!item.flag" class="bt" @click="item.flag=!item.flag,zonghe.push({item}),jisuanzongfen()"><i
                    class="el-icon-plus"
                  />选题</span>
                  <span v-if="item.flag" class="bt yichu" @click="item.flag=!item.flag,yichuzonghe(item.questionId),jisuanzongfen()"><i
                    class="el-icon-close"
                  />移除</span>
                </p>
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item label="总分:">
          <el-input v-model="zongfen" multiple class="ip" disabled size="mini" />
          分
        </el-form-item>
        <el-form-item label="题目总数::">
          <el-input
            v-model="zhongshu"
            multiple
            class="ip"
            size="mini"
            disabled
          />
          题
        </el-form-item>
      </el-form>
      <div class="foter">
        <a @click="shengcheng">
          <el-button size="mini" type="primary">生成练习</el-button>
        </a>
      </div>
    </div>
    <el-dialog
      title="预览"
      :visible.sync="zd"
      :append-to-body="true"
      width="70%"
    >
      <detailsOfExaminationPapers v-if="zd" :kemu-list="kemuList" :jiaocai-list="jiaocaiList" :zhangjie-list="zhangjieList" :jie-list="jieList" :timu-obj="timuObj" @fanhuis="fanhuis" @tijiao="tijiao" />
    </el-dialog>

  </div>
</template>

<script>
import detailsOfExaminationPapers from '@/views/management/release/detailsOfExaminationPapers'
import { subjectListByKeyword, knowledgePointListBySubjectId } from '@/api/Subject'
import { questionlistByKeyword } from '@/api/testPaper'
import { teachingMaterialListByKeyword, listByMaterialId, listBySubjectIdnot } from '@/api/management'
import { questionGet } from '@/api/ItemBank'

export default {
  name: 'Index',
  components: { detailsOfExaminationPapers },
  data() {
    return {
      zhishidianList: [],
      childChapterId: [],
      jieList: [],
      chapterId: null,
      zhangjieList: [],
      teachingMaterialId: null,
      tableData: [],
      morenfen: 2,
      title: '',
      zongfen: 0,
      zonghe: [],
      zonghetiList: [],
      jianda: [],
      jiandaiList: [],
      tiankongti: [],
      tiankongtiList: [],
      duoxuantiList: [],
      duoxuanti: [],
      danxuanti: [],
      flages: false,
      zd: false,
      num7: 0,
      value1: 3,
      form: {
        region1: []
      },
      rideo: 0,
      riodList: [
        {
          value: 0,
          label: '﻿单选'
        },
        {
          value: 1,
          label: '多选'
        },
        {
          value: 2,
          label: '填空'
        },
        {
          value: 3,
          label: '问答题'
        },
        {
          value: 4,
          label: '综合题'
        }
      ],
      kemuList: [],
      subjectId: '',
      jiaocaiList: [],
      xianxiang2: [],
      xianxiang3: [],
      xianglixanglist: [],
      danxuanlist: [],
      zhongshu: 0,
      timuObj: {}
    }
  },
  watch: {
    rideo() {
      var arr = []
      this.xianglixanglist.forEach(data => {
        arr.push(data.pointId)
      })
      this.queren(arr)
    },
    xianglixanglist() {
      var arr = []
      this.xianglixanglist.forEach(data => {
        arr.push(data.pointId)
      })
      this.queren(arr)
    },
    subjectId() {
      teachingMaterialListByKeyword({ currentPage: 1, pageSize: 9999999, subjectId: this.subjectId }).then(data => {
        this.jiaocaiList = data.data.list
      })
      knowledgePointListBySubjectId({ currentPage: 1, pageSize: 9999999, subjectId: this.subjectId }).then(data => {
        this.zhishidianList = data.data
      })
    },
    teachingMaterialId() {
      listByMaterialId({ materialId: this.teachingMaterialId }).then(data => {
        this.zhangjieList = data.data[0].chapters
      })
    },
    chapterId() {
      this.zhangjieList.forEach(data => {
        if (data.chapterId == this.chapterId) {
          this.jieList = data.childChapters
        }
      })
    }
  },
  created() {
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      if (data.code == 200) {
        this.kemuList = data.data.list
      }
    })
  },
  methods: {
    fanhuis() {
      this.zd = false
    },
    tijiao() {
      this.zd = false
    },
    xiaotifensu() {
      this.jisuanzongfen()
    },
    jisuanzongfen() {
      var num = 0
      this.danxuanti.forEach(data => {
        num = num + (data.item.fenshu - 0)
      })
      this.duoxuanti.forEach(data => {
        num = num + (data.item.fenshu - 0)
      })
      this.tiankongti.forEach(data => {
        num = num + (data.item.fenshu - 0)
      })
      this.jianda.forEach(data => {
        num = num + (data.item.fenshu - 0)
      })
      this.zonghe.forEach(data => {
        data.item.ziti.forEach(val => {
          num = num + (val.fenshu - 0)
        })
      })
      this.zongfen = num
    },
    shengcheng() {
      var timuObj = {
        subjectId: this.subjectId,
        title: this.title,
        danxuan: this.danxuanti,
        duoxuan: this.duoxuanti,
        thisnkong: this.tiankongti,
        jianda: this.jianda,
        zonghe: this.zonghe,
        zongfen: this.zongfen,
        zhongshu: this.zhongshu,
        teachingMaterialId: this.teachingMaterialId,
        chapterId: this.chapterId,
        childChapterId: this.childChapterId
      }
      this.timuObj = timuObj
      this.zd = true
    },
    queren_(val) {
      var flag = true
      this.xianglixanglist.forEach(data => {
        if (data.pointId == val.pointId) {
          flag = false
        }
      })
      if (flag) {
        this.xianglixanglist.push(val)
      }
    },

    yichuzonghe(val) {
      this.zonghe.forEach((data, idx) => {
        if (data.item.questionId == val) {
          this.zonghe.splice(idx, 1)
        }
      })
    },
    yichujianda(val) {
      this.jianda.forEach((data, idx) => {
        if (data.item.questionId == val) {
          this.jianda.splice(idx, 1)
        }
      })
    },
    yichutiankong(val) {
      this.tiankongti.forEach((data, idx) => {
        if (data.item.questionId == val) {
          this.tiankongti.splice(idx, 1)
        }
      })
    },
    yichuduoxuan(val) {
      this.duoxuanti.forEach((data, idx) => {
        if (data.item.questionId == val) {
          this.duoxuanti.splice(idx, 1)
        }
      })
    },
    yichu(val) {
      this.danxuanti.forEach((data, idx) => {
        if (data.item.questionId == val) {
          this.danxuanti.splice(idx, 1)
        }
      })
    },
    handleChange(val) {
    },
    shanchutag(val) {
      this.xianglixanglist.splice(val, 1)
    },
    xuanxiang1(val) {
      this.xianxiang3 = []
      this.xianxiang2 = val.children || []
    },
    xuanxiang2_(val) {
      this.xianxiang3 = val.children || []
    },
    queren(val) {
      questionlistByKeyword({
        pointId: val.join(','),
        questionType: this.rideo,
        subjectIds: this.subjectId,
        currentPage: 1,
        pageSize: 999999999
      }).then(data => {
        if (data.code == 200) {
          if (this.rideo == 0) {
            var list = data.data
            list.forEach(val => {
              val.flag = false
              this.danxuanti.forEach(disx => {
                if (val.questionId == disx.item.questionId) {
                  val.flag = true
                  val.fenshu = this.morenfen
                }
              })
            })
            this.danxuanlist = list
          } else if (this.rideo == 1) {
            var list = data.data
            list.forEach(val => {
              val.flag = false
              this.duoxuanti.forEach(disx => {
                if (val.questionId == disx.item.questionId) {
                  val.flag = true
                  val.fenshu = this.morenfen
                }
              })
            })
            this.duoxuantiList = list
          } else if (this.rideo == 2) {
            var list = data.data
            list.forEach(val => {
              val.flag = false
              this.tiankongti.forEach(disx => {
                if (val.questionId == disx.item.questionId) {
                  val.flag = true
                  val.fenshu = this.morenfen
                }
              })
            })
            this.tiankongtiList = list
          } else if (this.rideo == 3) {
            var list = data.data
            list.forEach(val => {
              val.flag = false
              this.jianda.forEach(disx => {
                if (val.questionId == disx.item.questionId) {
                  val.flag = true
                  val.fenshu = this.morenfen
                }
              })
            })
            this.jiandaiList = list
          } else if (this.rideo == 4) {
            var list = data.data
            list.forEach(val => {
              val.flag = false
              this.zonghe.forEach(disx => {
                if (val.questionId == disx.item.questionId) {
                  val.flag = true
                }
              })
            })
            var arr = []
            list.forEach(data => {
              data.questionChildIds.split(',').forEach(val => {
                arr.push(val)
              })
            })
            questionGet({ questionIds: arr.join(',') }).then(data => {
              if (data.code == 200) {
                list.forEach(val => {
                  val.ziti = []
                  val.questionChildIds.split(',').forEach(list => {
                    data.data.forEach(ul => {
                      if (list == ul.questionId) {
                        ul.fenshu = this.morenfen
                        val.ziti.push(ul)
                      }
                    })
                  })
                })
              }
              this.zonghetiList = list
            })
          }
        }
      })

      this.flages = false
      this.xianxiang2 = []
      this.xianxiang3 = []
    }
  }
}
</script>

<style scoped>
  .wpr {
    background-color: #fff;
    padding: 32px;
    box-sizing: border-box;
  }

  .top {
    padding-bottom: 32px;
  }

  .foter {
    text-align: center;
  }

  .riod {
    padding-top: 8px;
  }

  .riod li {
    float: left;
    margin-right: 10px;
    padding: 4px 15px;
    line-height: 14px;
    border-radius: 2px;
    border: 1px solid rgba(230, 230, 230, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .ack {
    background: rgba(236, 244, 255, 1);
    border: 1px solid rgba(31, 110, 255, 1) !important;
  }

  .gou, .duigou {
    display: none;
  }

  .ack .gou, .ack .duigou {
    display: block;
  }

  .duigou {
    width: 60px;
    height: 20px;
    background-color: #1F6EFF;
    position: absolute;
    right: -30px;
    bottom: -10px;
    transform: rotateZ(135deg);
  }

  .gou {
    position: absolute;
    right: 0;
    bottom: -3px;
    color: #fff;
    font-size: 6px;
  }

  .ipt {
    width: 60px;
  }

  .fen {
    float: left;
    position: relative;
    top: -8px;
  }

  .zsd {
    width: 100%;
  }

  .nu {
    margin-top: 10px;
  }

  .nu li {
    float: right;
    border: 1px #1F6EFF solid;
    border-radius: 12px;
    margin-right: 10px;
    line-height: 0;
    padding: 10px 10px;
    cursor: pointer
  }

  .nu2 {
    color: #fff;
    background-color: #1F6EFF;
  }

  .nu1, .yx {
    color: #1F6EFF;
  }

  .li {
    float: left;
  }

  .xtk {
    width: 100%;
    border: 1px #FAFAFA solid;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    overflow: auto;
    max-height: 1200px;
  }

  .xia {
    height: 42px;
    line-height: 42px;
    position: relative;
  }

  .xinx {
    position: relative;
    top: 10px;
  }

  .xtk li {
    padding: 10px;
    background-color: #FAFAFA;
    border: 1px #ccc solid;
    margin-top: 10px;
  }

  .xiantiao {
    border-bottom: 1px #ccc dashed;
  }

  .bt {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 2px 10px;
    color: #fff;
    font-size: 12px;
    background-color: #1F6EFF;
    line-height: 20px;
    cursor: pointer;

  }

  .ip {
    width: 120px;
  }

  .foter {
    text-align: center;
  }

  .tigan {
    line-height: 18px;
    text-indent: 2em;
    padding-bottom: 10px;
  }

  .input-number {
    text-align: right;
    overflow: hidden;
  }

  .timuz {
    color: #1F6EFF;
  }

  .set {
    width: 100%;
    height: 36px;
    padding: 4px 0;
    box-sizing: border-box;
  }

  .iptsa {
    height: 28px;
    width: 100%;
    border: 1px #eee solid;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
  }

  .iptsas {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer
  }

  .center {
    margin-right: 8px;
    font-size: 16px;
    color: #ccc;
    margin-top: 6px;
  }

  .lists {
    position: absolute;
    top: 28px;
    width: 100%;
    z-index: 999;
  }

  .lists1 {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    border: 1px #eee solid;
    box-shadow: 2px 3px 5px #ccc;
  }

  .lists2 {
    position: absolute;
    left: 200px;
    top: 0;
    width: 200px;
    border: 1px #eee solid;
    box-shadow: 2px 3px 5px #ccc;
  }

  .lists3 {
    position: absolute;
    left: 400px;
    top: 0;
    width: 200px;
    border: 1px #eee solid;
    box-shadow: 2px 3px 5px #ccc;
  }

  .set .list {
    width: 100%;
    height: 32px;
    background-color: #fff;
    color: #666;
    line-height: 32px;
    padding-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer
  }

  .set .list:hover {
    background-color: #eee;
    transition: all 2s;
  }

  .modays {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .tag {
    position: relative;
    top: -6px;
  }

  .tag .el-tag {
    margin-left: 5px;
  }

  .zhankog {
    color: #ccc;
    position: relative;
    top: -5px;
    left: 10px;
  }

  .tigan {
    display: inline-block;
  }

  .yichu {
    background-color: #ff4d51;
  }

  .nandu {
    position: relative;
  }

  .pingfen {
    position: absolute;
    top: -2px;
    left: 32px;
    width: 150px;
  }
</style>
