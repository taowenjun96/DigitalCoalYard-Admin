<!-- 取料计划 -->
<template>
  <div class="pick-up-plan">
    <div class="header">
      <div class="theme">取料任务</div>
    </div>
    <div class="main">
      <el-form :inline="true" :model="formData">
        <el-form-item label="料场">
          <el-select v-model="formData.stockyard" placeholder="请选择" clearable>
            <el-option :label="data.name" v-for="data in taskSourceList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间范围">
          <el-date-picker v-model="formData.creationTimeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column prop="partition" label="分区" header-align="center" align="center"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="stockyard" label="所属料场" header-align="center" align="center"></el-table-column>
        <el-table-column prop="coal" label="煤种" header-align="center" align="center"></el-table-column>
        <el-table-column prop="coalQuantity" label="当前煤量(吨)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="volume" label="体积(立方米)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="position" label="位置(米)" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="180">
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="handleAddPlan(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"> </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";

const addOrUpdateRef = ref();

// 搜索条件
const formData = reactive({
  stockyard: null,
  creationTimeData: [],
  startCreationTime: "",
  endCreationTime: ""
});

const state = reactive({
  dataListLoading: false,
  dialogVisible: false,
  taskDataList: [],
  dataList: [
    {
      id: "1",
      partition: "admin",
      creationTime: "2023-01-11 16:23:03",
      stockyard: "admin",
      coal: "2023-01-12 16:23:03",
      coalQuantity: "admin",
      volume: "2023-01-13 16:23:03",
      position: "计划描述",
    },
    {
      id: "2",
      partition: "admin",
      creationTime: "2023-01-11 16:23:03",
      stockyard: "admin",
      coal: "2023-01-12 16:23:03",
      coalQuantity: "admin",
      volume: "2023-01-13 16:23:03",
      position: "计划描述",
    }
  ],
  page: 1,
  pageSize: 20,
  total: 100,
  coalList: [
    {
      id: 1,
      name: "煤种1"
    },
    {
      id: 2,
      name: "煤种2"
    },
    {
      id: 3,
      name: "煤种3"
    }
  ]
});

const taskSourceList = reactive([
  {
    id: 1,
    name: "任务源1"
  }
]);

// 添加计划
const handleAddPlan = (id?: number) => {
  console.log(addOrUpdateRef, "----addOrUpdateRef");
  addOrUpdateRef.value.init(id);
};

// 查询接口
const getDataList = () => {};

// 审批
const handleApproval = (id: number) => {};

const handleDelete = (id: number) => {};

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
