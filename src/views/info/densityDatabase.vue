<!-- 密度数据库  densityDatabase.vue-->
<template>
  <div class="pick-up-plan">
    <div class="header">
      <div class="theme">密度数据库</div>
    </div>

    <div class="main">
      <el-form :inline="true" :model="formData">
        <el-form-item label="分区名称">
          <el-input v-model="formData.creator" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="煤种">
          <el-input v-model="formData.coalType" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column prop="creator" label="分区名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="coalType" label="煤种" header-align="center" align="center"></el-table-column>
        <el-table-column prop="density" label="密度" header-align="center" align="center"></el-table-column>
      </el-table>
    </div>

    <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"> </el-pagination>

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";


// 搜索条件
const formData = reactive({
  creator: "",
  coalType: ""
});

const state = reactive({
  isShow: true,
  dataListLoading: false,
  dataList: [
    {
      id: "1",
      creator: "分区1",
      coalType: "烟煤",
      density: "1.5",
    },
    {
      id: "2",
      creator: "分区2",
      coalType: "烟煤",
      density: "1.5",
    }
  ],
  page: 1,
  pageSize: 20,
  total: 100,
  
});

// 查询接口
const getDataList = () => {};


// 分页, 每页条数
const pageSizeChangeHandle = (val: number) => {
  state.page = 1;
  state.pageSize = val;
  getDataList();
};
// 分页, 当前页
const pageCurrentChangeHandle = (val: number) => {
  console.log(`current page: ${val}`);
  state.page = val;
  getDataList();
};
</script>

<style lang="less" scoped>
.task-performed {
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
}
.header {
  border-bottom: 1px solid;
  display: flex;
  padding: 16px;
  .theme {
    font-weight: 600;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.main {
  padding: 16px;
}
.pick-up-plan {
  background-color: #fff;
  border-radius: 12px;

  .my-header {
    display: flex;
    text-align: center;

    .dialogTitle {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      font-size: 15px;
    }
  }

  .checkBoxAll {
    display: flex;

    .checkbox-main {
      border: 1px solid red;
    }

    .main-title {
      font-weight: 600;
    }
  }

  .mypagination {
    padding: 0 16px 16px 0;
  }
}
</style>
