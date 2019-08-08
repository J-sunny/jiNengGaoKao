<template>
  <div>
    <div class="top">
      <el-input size="mini" type="text" class="ipt" suffix-icon="el-icon-search"></el-input>
      <div class="btn">
        <el-button type="primary" size="mini" round @click="dialogVisible=true">创建角色</el-button>
      </div>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="permissionName"
          align="center"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="address"
          width="180"
          align="center"
          label="操作">
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>

    </div>
    <el-dialog
      title="分配模块权限"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="1080px">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          align="center"
          width="180">
          <template slot="header">
            <el-checkbox v-model="checked"></el-checkbox><span>开通模块全部权限</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="address"
          width="180"
          align="center"
          label="操作">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {permissionListByKeyword} from '@/api/system'

  export default {
    name: "role",
    data() {
      return {
        checked:true,
        tableData: [],
        currentPage3: 1,
        dialogVisible: false,
        form:{
          id:'',
          name:''
        },
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
      },
      getList(currentPage,pageSize){
        permissionListByKeyword({currentPage:currentPage,pageSize:pageSize,keyword:this.keyword}).then(data=>{
          this.tableData=data.data.list
        })
      },
    },
    created(){
this.getList(1,10)
    }
  }
</script>

<style scoped>
  .top {
    width: 100%;
    padding: 39px 44px 15px 44px;
    box-sizing: border-box;
  }

  .ipt {
    width: 360px;
  }

  .btn {
    float: right;
  }

  .tab {
    padding: 0 44px 44px 44px;
  }

  .pag {
    padding-top: 30px;
    text-align: center;
  }
</style>
