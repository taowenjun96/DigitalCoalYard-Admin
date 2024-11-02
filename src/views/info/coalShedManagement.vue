<!-- 煤棚管理 -->
<template>
  <div class="coal-shed-management">
    <div class="header">
      <div class="theme">煤棚管理</div>
    </div>
    <div class="main">
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column  type="index" label="编号" header-align="center" align="center" width="90px"></el-table-column>
        <el-table-column prop="coalShedName" label="煤棚名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="lengthRange" label="长度范围(米)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="widthRange" label="宽度范围(米)" header-align="center" align="center"></el-table-column>
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
      coalShedName: "1号煤棚",
      lengthRange:'0-335.56',
      widthRange:'0-102',
    },
  ],
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
.coal-shed-management {
  background-color: #fff;
  border-radius: 12px;
}
</style>
