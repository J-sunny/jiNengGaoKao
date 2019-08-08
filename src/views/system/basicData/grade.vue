<template>
  <div>
    <div class="top">
      <el-input size="mini" type="text" class="ipt" suffix-icon="el-icon-search"></el-input>
      <div class="btn">
        <el-button type="primary" size="mini" round @click="dialogVisible=true">添加年级</el-button>
      </div>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="年级"
          align="center"
          label="专业名称">
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
      title="添加年级"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="460px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID:">
          <el-input size="mini" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年级名称::">
          <el-input size="mini" v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "grade",
    data() {
      return {
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
      }
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
