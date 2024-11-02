<!-- 分区密度 -->
<template>
  <div class="partition-density">
    <div class="header">
      <div class="theme">分区密度</div>
    </div>
    <div class="main">
      <el-form :inline="true" :model="formData">
        <el-form-item label="时间范围" v-show="state.isShow">
          <el-date-picker v-model="formData.timeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column prop="Time" label="时间" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ moment(scope.row.Time).format("YYYY-MM-DD HH:mm:ss") }}</p>
          </template>
        </el-table-column>
        <el-table-column label="E1A" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_One_A }}/{{ scope.row.Density_One_A }}</p>
          </template>
        </el-table-column>
        <el-table-column label="E1B" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_One_B }}/{{ scope.row.Density_One_B }}</p>
          </template>
        </el-table-column>
        <el-table-column label="E1C" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_One_C }}/{{ scope.row.Density_One_C }}</p>
          </template>
        </el-table-column>
        <el-table-column label="E2A" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Two_A }}/{{ scope.row.Density_Two_A }}</p>
          </template>
        </el-table-column>
        <el-table-column label="E2B" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Two_B }}/{{ scope.row.Density_Two_B }}</p>
          </template>
        </el-table-column>
        <el-table-column label="E2C" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Two_C }}/{{ scope.row.Density_Two_C }}</p>
          </template>
        </el-table-column>
        <el-table-column label="F1A" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Three_A }}/{{ scope.row.Density_Three_A }}</p>
          </template>
        </el-table-column>
        <el-table-column label="F1B" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Three_B }}/{{ scope.row.Density_Three_B }}</p>
          </template>
        </el-table-column>
        <el-table-column label="F1C" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Three_C }}/{{ scope.row.Density_Three_C }}</p>
          </template>
        </el-table-column>
        <el-table-column label="F2A" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Four_A }}/{{ scope.row.Density_Four_A }}</p>
          </template>
        </el-table-column>
        <el-table-column label="F2B" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Four_B }}/{{ scope.row.Density_Four_B }}</p>
          </template>
        </el-table-column>
        <el-table-column label="F2C" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.Type_Four_C }}/{{ scope.row.Density_Four_C }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"> </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onActivated } from "vue";
import { getPartitionDensity } from "@/api/historyApi";
import moment from "moment";

// 搜索条件
const formData = reactive({
  timeData: []
});

const state = reactive({
  isShow: true,
  dataListLoading: false,
  dataList: [],
  page: 1,
  pageSize: 10,
  total: 0
});

onActivated(() => {
  getDataList(1);
});

// 查询接口
const getDataList = (page?: number) => {
  if (page) {
    state.page = page;
  }
  let newDate = JSON.parse(JSON.stringify(formData.timeData));
  if (!newDate) {
    newDate = [];
  }
  let params = {
    startTime: newDate[0],
    endTime: newDate[1],
    page: state.page,
    pageSize: state.pageSize
  };
  getPartitionDensity(params).then((res) => {
    if (res.code == 0) {
      state.dataList = res.data;
      state.total = res.total;
    }
  });
};

// 分页, 每页条数
const pageSizeChangeHandle = (val: number) => {
  state.page = 1;
  state.pageSize = val;
  getDataList();
};
// 分页, 当前页
const pageCurrentChangeHandle = (val: number) => {
  state.page = val;
  getDataList();
};
</script>

<style lang="less" scoped>
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
.partition-density {
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
