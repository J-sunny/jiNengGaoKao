<template>
<div class="box_r">
  <div class="tab">
    <ul>
      <li :class="tab=='1'?'avc':''"  @click="tab=1">专业管理</li>
      <li :class="tab=='2'?'avc':''"  @click="tab=2" v-if="false">年级管理</li>
      <li :class="tab=='3'?'avc':''"  @click="tab=3">班级管理</li>
    </ul>
  </div>
  <div class="xian"></div>
  <div class="ctn">
    <major v-if="tab==1"></major>
    <grade v-if="tab==2"></grade>
    <Team v-if="tab==3"></Team>
  </div>




</div>
</template>

<script>
  import major from './major'
  import grade from './grade'
  import Team from './Team'
    export default {
        name: "index",
      components:{major,grade,Team},
      data(){
          return{
            tab:'1'
          }
      },
      created(){
        console.log(this.$store.state);
      },
    }
</script>

<style scoped>
  .tab li{
    float: left;
    padding: 11px 46px;
    cursor:pointer;
  }
  .tab ul{
    overflow: hidden;
  }
  .avc{
    background-color: #fff;
  }
  .xian{
    height: 2px;
  }
  .ctn{
    background-color: #fff;
  }
</style>
