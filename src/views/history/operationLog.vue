<!-- 操作日志 -->
<template>
  <div class="alarm-record">
    <div class="header">
      <div class="theme">操作日志</div>
    </div>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick" style="padding: 0 16px">
      <el-tab-pane label="斗轮堆取料机" name="first">
        <div class="main">
          <el-form :inline="true" :model="formData">
            <el-form-item label="时间范围" v-show="state.isShow">
              <el-date-picker v-model="formData.timeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDataList(1)">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table v-loading="state.dataListLoading" :data="state.dataListFirst" border style="width: 100%">
            <el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" header-align="center" align="center">
              <template v-slot="scope">
                <p>{{ moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="info" label="操作内容" header-align="center" align="center"></el-table-column>
            <el-table-column prop="operator" label="操作人员" header-align="center" align="center"></el-table-column>
          </el-table>
          <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"> </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="斗轮取料机" name="second">
        <div class="main">
          <el-form :inline="true" :model="formData">
            <el-form-item label="时间范围" v-show="state.isShow">
              <el-date-picker v-model="formData.timeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDataList(1)">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table v-loading="state.dataListLoading" :data="state.dataListSecord" border style="width: 100%">
            <el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" header-align="center" align="center">
              <template v-slot="scope">
                <p>{{ moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="info" label="操作内容" header-align="center" align="center"></el-table-column>
            <el-table-column prop="operator" label="操作人员" header-align="center" align="center"></el-table-column>
          </el-table>
          <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"> </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="盘煤仪" name="third"
        ><div class="main">
          <el-form :inline="true" :model="formData">
            <el-form-item label="时间范围" v-show="state.isShow">
              <el-date-picker v-model="formData.timeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDataList(1)">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table v-loading="state.dataListLoading" :data="state.dataListThird" border style="width: 100%">
            <el-table-column prop="ID" label="序号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="Time" label="时间" header-align="center" align="center">
              <template v-slot="scope">
                <p>{{ moment(scope.row.Time).format("YYYY-MM-DD HH:mm:ss") }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="Info" label="操作内容" header-align="center" align="center"></el-table-column>
            <el-table-column prop="Operator" label="操作人员" header-align="center" align="center"></el-table-column>
          </el-table>
          <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle">
          </el-pagination></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onActivated } from "vue";
import { getBucketWheelStackerReclaimer, getBucketWheelReclaimer, getCoalPanInstrument } from "@/api/historyApi";
import moment from "moment";
import type { TabsPaneContext } from "element-plus";

// 搜索条件
const formData = reactive({
  timeData: []
});
const activeName = ref("first");

const state = reactive({
  isShow: true,
  dataListLoading: false,
  dataListFirst: [],
  dataListSecord: [],
  dataListThird: [],
  page: 1,
  pageSize: 10,
  total: 0
});

onActivated(() => {
  activeName.value = "first";
  getDataList(1);
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  formData.timeData = [];
  getDataList(1);
};
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
    starttime: newDate[0],
    endtime: newDate[1],
    page: state.page,
    pageSize: state.pageSize
  };
  switch (activeName.value) {
    case "first":
      getBucketWheelStackerReclaimer(params).then((res) => {
        if (res.code == 0) {
          state.dataListFirst = res.data;
          state.total = res.total;
        }
      });
      break;
    case "second":
      getBucketWheelReclaimer(params).then((res) => {
        if (res.code == 0) {
          state.dataListSecord = res.data;
          state.total = res.total;
        }
      });
      break;
    // ... 可以有更多的 case 子句
    case "third":
      getCoalPanInstrument(params).then((res) => {
        if (res.code == 0) {
          state.dataListThird = res.data;
          state.total = res.total;
        }
      });
      break;
    default:
      break;
  }
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
  padding: 16px 0;
}
.alarm-record {
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
