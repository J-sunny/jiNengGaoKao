<template>
  <div>
    <div class="title" v-html="timu.sysQuestion.questionTitle" />
    <div v-for="(item,index) in timuList" v-if="flag">
      <div class="zonghe">
        <singleElection v-if="item.sysQuestion.questionType==0" ref="clesf" :msf="msf" :fenshu="ziti.ziti[index].fenshu" :timu="item" @tijiao="tijiao" />
        <singleElection v-if="item.sysQuestion.questionType==1" ref="clesf" :msf="msf" :fenshu="ziti.ziti[index].fenshu" :timu="item" @tijiao="tijiao" />
        <fillInTheBlanks v-if="item.sysQuestion.questionType==2" ref="clesf" :msf="msf" :fenshu="ziti.ziti[index].fenshu" :timu="item" @tijiao="tijiao" />
        <fillInTheBlanks v-if="item.sysQuestion.questionType==3" ref="clesf" :msf="msf" :fenshu="ziti.ziti[index].fenshu" :timu="item" @tijiao="tijiao" />
      </div>

    </div>
  </div>

</template>

<script>
import { A_Z } from '@/utils/list'
import { reviewget, reviewread } from '@/api/testPaper'
import singleElection from './singleElection'
import fillInTheBlanks from './fillInTheBlanks'
export default {
  name: 'Comprehensive',
  components: { singleElection, fillInTheBlanks },
  props: ['timu', 'studentId', 'releaseId', 'ziti', 'msf'],
  data() {
    return {
      timuList: [],
      flag: false,
      flags: 0
    }
  },
  watch: {
    flags() {
      if (this.flags == this.timuList.length) {
        this.$emit('tijiao_')
      }
    }
  },
  created() {
    reviewget({ questionIds: this.timu.sysQuestion.questionChildIds, releaseId: this.releaseId, studentId: this.studentId }).then(data => {
      this.timuList = data.data
      this.flag = true
    })
  },
  methods: {
    xiayiti_() {
      this.$refs.clesf.forEach((data, idx) => {
        this.$refs.clesf[idx].xiayiti_()
      })
    },
    tijiao(val) {
      val.studentId = this.studentId
      reviewread(val).then(data => {
        this.flags++
      })
    }
  }
}
</script>
<style scoped>
  .title{
    border: #ccc 1px solid;
    background-color: #eee;
    padding: 10px;
  }
  .zonghe{
    padding: 10px;
    border: 1px #ccc solid;
    margin-top: 15px;
  }
</style>
