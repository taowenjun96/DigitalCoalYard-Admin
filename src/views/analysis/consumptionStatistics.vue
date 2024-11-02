<template>
  <div class="consumption-statistics">
    <div class="title">班组进耗</div>
    <div class="search">
      <el-form :inline="true" :model="searchData" @keyup.enter="state.getDataList()">
        <el-form-item prop="team" label="班组">
          <el-select v-model="searchData.team" placeholder="班组">
            <el-option v-for="item in teamList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="timeData">
          <el-date-picker v-model="searchData.timeData" type="datetimerange" range-separator="--" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <MyCharts :dataSource="dataSource" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight"></MyCharts>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import MyCharts from "./charts.vue"; // 引入封装的图表组件

const dataSource = reactive({
  title: {
    text: ""
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {
    data: ["进", "耗"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["2023/2/18", "2023/2/18", "2023/3/18", "2023/3/19", "2023/3/20", "2023/3/21", "2023/3/22"]
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "进",
      type: "line",
      stack: "Total",
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: "series"
      },
      data: [120, 111, 101, 66, 55, 44, 22]
    },
    {
      name: "耗",
      type: "line",
      smooth: true,
      stack: "Total",
      areaStyle: { opacity: 0.6, color: "red" },
      lineStyle: {
        color: "red"
      },
      emphasis: {
        focus: "series"
      },
      itemStyle: {
        normal: {
          color: "red"
        }
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
});

const searchData = reactive({
  team: "",
  timeData: [],
  startTime: "",
  endTime: ""
});
const canvasWidth = ref("");
const canvasHeight = ref("600px");
const teamList = reactive([
  { id: 1, name: "班组1" },
  { id: 2, name: "班组2" },
  { id: 3, name: "班组3" }
]);

const getTeamList = () => {};
const getDataList = () => {
  console.log(searchData, "---");
};
</script>
<style lang="less" scoped>
.consumption-statistics {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  .title {
    border-bottom: 1px solid #a8abb2;
    padding-bottom: 12px;
  }
  .search {
    padding-top: 12px;
  }
}
</style>
