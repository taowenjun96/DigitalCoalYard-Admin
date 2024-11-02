<!-- 取料计划 -->
<template>
  <div class="task-performed">
    <div class="header">
      <div class="theme">正在执行的任务</div>
    </div>
    <div class="main">
      <el-table :data="state.taskDataList" border style="width: 100%">
        <el-table-column prop="creator" label="创建人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="publisher" label="发布人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="publishTime" label="发布时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="taskSource" label="任务源" header-align="center" align="center"></el-table-column>
        <el-table-column label="详细" header-align="center" align="center">
          <template v-slot="scope"> {{ scope.row.coal }}{{ scope.row.weight }} </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div class="pick-up-plan">
    <div class="header">
      <div class="theme">取料任务</div>
      <el-button type="primary" size="small" @click="handleAddPlan()">添加任务</el-button>
    </div>
    <div class="main">
      <el-form :inline="true" :model="formData">
        <el-form-item label="任务源">
          <el-select v-model="formData.taskSource" placeholder="请选择" clearable>
            <el-option :label="data.name" v-for="data in taskSourceList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.state" placeholder="请选择" clearable>
            <el-option :label="data.name" v-for="data in taskSourceList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="煤堆">
          <el-select v-model="formData.dump" placeholder="请选择" clearable>
            <el-option :label="data.name" v-for="data in taskSourceList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人" v-show="state.isShow">
          <el-select v-model="formData.creator" placeholder="请选择" clearable>
            <el-option :label="data.name" v-for="data in taskSourceList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间范围" v-show="state.isShow">
          <el-date-picker v-model="formData.creationTimeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" />
        </el-form-item>
        <el-form-item label="计划时间范围" v-show="state.isShow">
          <el-date-picker v-model="formData.plannedTimeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" />
        </el-form-item>
        <el-form-item label="发布人" v-show="state.isShow">
          <el-select v-model="formData.publisher" placeholder="请选择" clearable>
            <el-option :label="data.name" v-for="data in taskSourceList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间范围" v-show="state.isShow">
          <el-date-picker v-model="formData.publishTimeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" />
        </el-form-item>
        <el-form-item label="撤回人" v-show="state.isShow">
          <el-select v-model="formData.retracter" placeholder="请选择" clearable>
            <el-option :label="data.name" v-for="data in taskSourceList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="撤回时间范围" v-show="state.isShow">
          <el-date-picker v-model="formData.retractionTimeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
          <el-button type="primary" link @click="handleCheckShow()"
            >{{ state.isShow ? "收起" : "更多" }}<el-icon><ArrowUpBold v-show="state.isShow" /><ArrowDownBold v-show="!state.isShow" /></el-icon
          ></el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column label="创建人/时间" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.creator }}</p>
            <p>{{ scope.row.creationTime }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发布人/时间" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.publisher }}</p>
            <p>{{ scope.row.publishTime }}</p>
          </template>
        </el-table-column>
        <el-table-column label="撤回人/时间" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.retracter }}</p>
            <p>{{ scope.row.retractionTime }}</p>
          </template>
        </el-table-column>
        <el-table-column label="计划/实际执行时间" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.plannedExecutionTime }}</p>
            <p>{{ scope.row.actualExecutionTime }}</p>
          </template>
        </el-table-column>
        <el-table-column label="计划/实际煤量(吨)" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.plannedCoal }}</p>
            <p>{{ scope.row.actualCoal }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="taskSource" label="任务源" header-align="center" align="center"></el-table-column>
        <el-table-column label="状态" header-align="center" align="center">
          <template v-slot="scope">
            {{ scope.row.state ? "通过" : "不通过" }}
          </template>
        </el-table-column>
        <el-table-column label="详细" header-align="center" align="center">
          <template v-slot="scope"> {{ scope.row.coal }}{{ scope.row.weight }} </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="180">
          <template v-slot="scope">
            <el-button type="success" size="small" @click="handleApproval(scope.row.id)">发布</el-button>
            <el-button type="warning" size="small" @click="handleAddPlan(scope.row.id)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">撤回</el-button>
            <el-button type="primary" size="small" @click="handleApproval(scope.row.id)">完成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"> </el-pagination>

    <add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import AddOrUpdate from "./pickUpPlan-add-or-update.vue";

const addOrUpdateRef = ref();

// 搜索条件
const formData = reactive({
  taskSource: null,
  state: "",
  dump: "",
  creator: "",
  creationTimeData: [],
  startCreationTime: "",
  endCreationTime: "",
  plannedTimeData: [],
  startPlannedTime: "",
  endPlannedTime: "",
  publisher: "",
  publishTimeData: [],
  startPublishTime: "",
  endPublishTime: "",
  retracter: "",
  retractionTimeData: [],
  startRetractionTime: "",
  endRetractionTime: ""
});

const state = reactive({
  isShow: true,
  dataListLoading: false,
  dialogVisible: false,
  taskDataList: [],
  dataList: [
    {
      id: "1",
      creator: "admin",
      creationTime: "2023-01-11 16:23:03",
      approver: "admin",
      approverTime: "2023-01-12 16:23:03",
      retracter: "admin",
      retractionTime: "2023-01-13 16:23:03",
      planDescription: "计划描述",
      plannedTime: "2023-02-13 16:23:03",
      taskSource: "数字化煤场",
      state: 0,
      coal: "煤",
      weight: "300吨"
    },
    {
      id: "2",
      creator: "admin",
      creationTime: "2023-01-11 16:23:03",
      approver: "admin",
      approverTime: "2023-01-12 16:23:03",
      retracter: "admin",
      retractionTime: "2023-01-13 16:23:03",
      planDescription: "计划描述",
      plannedTime: "2023-02-13 16:23:03",
      taskSource: "数字化煤场",
      state: 1,
      coal: "国废",
      weight: "200吨"
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
  console.log(addOrUpdateRef,'----addOrUpdateRef')
  addOrUpdateRef.value.init(id);
};


// 查询接口
const getDataList = () => {};

const handleCheckShow = () => {
  state.isShow = !state.isShow;
};
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
