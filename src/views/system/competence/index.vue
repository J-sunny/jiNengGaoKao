<template>
  <div class="box_r">
    <div class="tab">
      <ul>
        <!--        <li :class="tab=='1'?'avc':''"  @click="tab=1">角色及权限管理</li>-->
        <li :class="tab=='2'?'avc':''" @click="tab=2">教师管理</li>
      </ul>
    </div>
    <div class="xian" />
    <div class="ctn">
      <role v-if="tab==1" />
      <Teacher v-if="tab==2" />
    </div>

  </div>
</template>

<script>
import role from './role'
import Teacher from './Teacher'

export default {
  name: 'Index',
  components: { role, Teacher },
  data() {
    return {
      tab: '2'
    }
  }
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
