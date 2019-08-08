<template>
  <div>
    <div class="title" v-html="timu.sysQuestion.questionTitle" />
    <p v-for="(item,index) in timu.sysQuestion.questionContent.split('丶')" class="xuanxiang">
      <span :class="timu.sysQuestion.questionAnswer.indexOf(index+'') != -1?'zq':''">{{ listaz[index] }}</span>
      {{ item }}
    </p>
    <div class="title">
      <p class="lh">
        学生答案：
        <span v-for="val in timu.reviewInfo.answer">{{ val }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        参考答案：
        <span v-for="(item,index) in listaz">
          <span v-for="val in timu.sysQuestion.questionAnswer" v-if="index==val">{{ item }}</span>
        </span>
      </p>
      <p class="lh">本题分数：{{ fenshu }}<span /></p>
      <p class="fu"><span class="fl">本题批注：</span>
        <span class="txt">
          <el-input
            v-model="textarea"
            type="textarea"
            :rows="2"
            :disabled="msf"
            placeholder="请输入内容"
          />
        </span>
      </p>
    </div>
  </div>

</template>

<script>
import { A_Z } from '@/utils/list'

export default {
  name: 'SingleElection',
  props: ['timu', 'fenshu', 'msf'],
  data() {
    return {
      listaz: [],
      textarea: ''
    }
  },
  created() {
    this.textarea = this.timu.reviewInfo.annotation
    this.listaz = A_Z()
  },
  methods: {
    xiayiti_() {
      var obj = {
        score: this.fenshu,
        questionId: this.timu.sysQuestion.questionId,
        reviewId: this.timu.reviewInfo.reviewId,
        annotation: this.textarea
      }
      this.$emit('tijiao', obj)
    }
  }
}
</script>
<style scoped>
  .title {
    border: #ccc 1px solid;
    background-color: #eee;
    padding: 10px;
  }

  .xuanxiang {
    padding: 10px;
  }
.fu{
  position: relative;
  height: 60px;
}
  .xuanxiang span {
    display: inline-block;
    width: 32px;
    height: 32px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 15px;
  }
  .txt{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-left: 70px;
  }
  .lh{
    line-height: 32px;
  }
  .zq{
    background-color: #42b983!important;
  }
</style>
