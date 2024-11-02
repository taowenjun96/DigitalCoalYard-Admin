<!-- bucketWheelManagement -->
<!-- 斗轮机管理 -->
<template>
  <div class="bucket-wheel-management">
    <div class="header">
      <div class="theme">斗轮机管理</div>
    </div>
    <div class="main">
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column type="index" label="编号" header-align="center" align="center" width="90px"></el-table-column>
        <el-table-column prop="bucketWheelMachineName" label="斗轮机名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="coalShedToWhichItBelongs" label="所属煤棚" header-align="center" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";

const state = reactive({
  dataListLoading: false,
  dataList: [
    {
      id: "1",
      bucketWheelMachineName: "斗轮堆取料机",
      coalShedToWhichItBelongs: "1号煤棚"
    },
    {
      id: "2",
      bucketWheelMachineName: "斗轮取料机",
      coalShedToWhichItBelongs: "1号煤棚"
    }
  ]
});
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
.bucket-wheel-management {
  background-color: #fff;
  border-radius: 12px;
}
</style>
