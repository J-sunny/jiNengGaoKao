<template>
  <div style="padding: 27px;">
    <div class="top" style="">
      <div class="topDiv" style="">
        <div style="width: 30%;height: 100%;float: left;">
          <img :src="teacherInfo.photoUrl" class="imgP">
        </div>
        <div style="width: 70%;height: 100%;float: left;">
          <ul style="margin-top: 30px;margin-left: 30px;">
            <li class="idCard">
              <div style="float: left;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-mingcheng"/>
                </svg>
              </div>
              <div class="tkTitleDiv">
                <span>{{teacherInfo.userRealName}}</span>
              </div>
            </li>
            <li class="idCard">
              <div style="float: left;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-mingcheng"/>
                </svg>
              </div>
              <div class="tkTitleDiv">
                <span>{{teacherInfo.teacherRole=='1'?'教师':'管理员' }}</span>
              </div>
            </li>
            <li class="idCard">
              <div style="float: left;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-mingcheng"/>
                </svg>
              </div>
              <div class="tkTitleDiv">
                <span>{{ teacherInfo.userAccount }}</span>
              </div>
            </li>
            <!-- <i class="iconfont icon-yingyu"></i> -->
            <li class="idCard">
              <div style="float: left;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-mingcheng"/>
                </svg>
              </div>
              <div class="tkTitleDiv">
                <span>登录密码：*******</span>
                <span class="updatePwd" @click="dialogVisible=true">修改密码</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="topDiv last"/>
    </div>
    <ul class="buttom">
      <li v-for="(item) in getPointBySubjects" :key="item.subjectId">
        <div class="subjectBox">
          <div slot="header" class="clearfix subjectTop">
            <div style="float: left;">
              <!-- <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yuwen"></use>
                            </svg> -->
              <img class="iconPic" :src="item.subjectIconPath" alt="">
            </div>
            <div class="tkTitleDiv">
              <span>{{ item.subjectName }}</span>
            </div>
          </div>
          <div v-if="item.statisticsPointErrorList.length==0">
            暂无数据
          </div>

          <div v-for="val in item.statisticsPointErrorList" :key="val.poinId" class="text item">
            <span v-if="val.length!=0">
              {{ val.pointName }}
            </span>
          </div>
          <router-link v-if="item.statisticsPointErrorList.length!=0"
                       :to="{path:'/knowledgePoints',query:{subjectId:item.subjectId}}" class="more">加载更多...
          </router-link>
          <!-- <div class="text item" style="color: rgb(255, 190, 0);text-align: center;">
                        <span style="font-size: 55px;">906</span>题
                    </div> -->
          <!-- <el-card class="box-card"> -->
          <!-- </el-card> -->
        </div>
      </li>
    </ul>

    <!-- 修改密码弹框 -->
    <el-dialog title="修改密码" :append-to-body="true" custom-class="nianji" :visible.sync="dialogVisible" width="460px">
      <el-form ref="form" label-width="80px">
        <el-form-item label="旧密码:">
          <el-input v-model="oldPwd" size="mini" show-password/>
        </el-form-item>
        <el-form-item label="新密码:">
          <el-input v-model="newPwd" size="mini" show-password/>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input v-model="newPwdAgin" size="mini" show-password/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="updatePassword()">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    knowledgePointListBySubjectId,
    childSave,
    knowledgePointDelete,
    knowledgePointChildDelete
  } from '@/api/Subject'
  import {
    getTeacherInfo,
    getPointBySubject,
    updatePassword
  } from '@/api/Asy'
  // import {getPointBySubject} from '@/api/Asy'

  export default {
    name: 'Asy',
    data() {
      return {
        questionCountData: [],
        teacherInfo: [],
        getPointBySubjects: [],
        dialogVisible: false,
        oldPwd: '',
        newPwd: '',
        newPwdAgin: '',
        userPwdOld: '',
        userType: '',
        userId: ''
      }
    },
    created() {
      // 获取个人信息
      getTeacherInfo({ userId: this.$store.state.user.introduction }).then(res => {
        console.log(res)
        this.teacherInfo = res.data
        this.userType = res.data.teacherRole
        this.userPwdOld = res.data.userPwd
        this.userId = res.data.userId
      })

      // 根据科目分类获取易错知识点前三名信息
      getPointBySubject().then(res => {
        // console.log(res)
        this.getPointBySubjects = res.data.list
        // console.log(this.getPointBySubjects)
      })
    },
    methods: {
      //  修改密码
      updatePassword() {
        if (this.oldPwd != this.userPwdOld) {
          this.$message.warning('旧密码不正确！')
        } else {
          if (this.newPwd == this.newPwdAgin) {
            updatePassword({
              userId: this.userId,
              userPwdOld: this.userPwdOld,
              userPwdNew: this.newPwd,
              userType: this.userType
            }).then(res => {
              console.log(res)
              this.dialogVisible = false
              this.$message.success('密码修改成功！')
            })
          } else {
            this.$message.warning('两次密码不一致！')
          }
        }
      }

    }
  }
</script>

<style scoped>
  .icon {
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .tkTitleDiv {
    float: left;
    margin-top: 10px;
  }

  .idCard {
    padding-top: 50px;
  }

  .imgP {
    position: absolute;
    top: 50%;
    margin-top: -70px;
    width: 120px;
    height: 120px;
    margin-left: 54px;
    border-radius: 50%;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .topDiv {
    width: 50%;
    height: 300px;
    background-color: #ffffff;
    position: relative;
  }

  .last {
    margin-left: 27px;
  }

  .buttom {
    width: 100%;
    /* height: 400px; */
    /*background-color: black;*/
    margin-top: 27px;
    overflow: hidden;
  }

  .buttom li {
    float: left;
    margin: 10px 38px 10px 0;
  }

  .buttom li:nth-child(5n) {
    margin-right: 0 !important;
    /* background:red; */
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  /* 	.clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    } */

  .box-card {
    width: 300px;
    height: 240px;
  }

  .icon-shuxue {
    font-size: 10px;
  }

  /* 修改密码按钮 */
  .updatePwd {
    display: inline-block;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: rgb(49, 182, 120);
    color: #FFF;
    margin-left: 20px;
    cursor: pointer;
  }

  .iconPic {
    width: 30px;
    height: 30px;
    display: inline-block;
  }

  /*  列表样式*/
  .subjectBox {
    width: 300px;
    background-color: #FFFFFF;
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .subjectBox .subjectTop {
    padding-bottom: 10px;
  }

  .subjectBox .more {
    text-decoration: none;
    float: right;
    color: #008A00;
    font-size: 14px;
  }
</style>
