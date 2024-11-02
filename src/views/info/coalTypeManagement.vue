<!-- 煤种管理  coalTypeManagement.vue-->
<template>
  <div class="coalType-management">
    <div class="header">
      <div class="theme">煤种管理</div>
      <el-button type="primary" size="small" @click="handleAddCoalType()">添加分区</el-button>
    </div>
    <div class="main">
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column prop="index" label="编号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="coalTypeName" label="煤种名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="density" label="密度" header-align="center" align="center"></el-table-column>
        <el-table-column prop="calorificValue" label="热值" header-align="center" align="center"></el-table-column>
        <el-table-column prop="sulfurContent" label="硫分" header-align="center" align="center"></el-table-column>
        <el-table-column prop="volatileMatter" label="挥发分" header-align="center" align="center"></el-table-column>
        <el-table-column prop="waterContent" label="水分" header-align="center" align="center"></el-table-column>
        <el-table-column prop="ashContent" label="灰分" header-align="center" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="220">
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="handleAddCoalType(scope.row.id)"
              ><el-icon><EditPen /></el-icon>修改</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import AddOrUpdate from "./coalType-add-or-update.vue";

const addOrUpdateRef = ref();

const state = reactive({
  dataListLoading: false,
  dataList: [
    {
      id: "1",
      index: "1",
      coalTypeName: "烟煤",
      density: "1.08",
      calorificValue: "21.578-21.578",
      sulfurContent: "0.6-0.84",
      volatileMatter: "12.69-12.69",
      waterContent: "26-23.2",
      ashContent: "23.2-14.6",
      description: ""
    },
    {
      id: "2",
      index: "2",
      coalTypeName: "烟煤",
      density: "1.08",
      calorificValue: "21.578-21.578",
      sulfurContent: "0.6-0.84",
      volatileMatter: "12.69-12.69",
      waterContent: "26-23.2",
      ashContent: "23.2-14.6",
      description: ""
    }
  ]
});

const getDataList = () => {};

// 添加分区
const handleAddCoalType = (id?: number) => {
  addOrUpdateRef.value.init(id);
};
// 删除
const handleDelete = (id: number) => {};
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
  .table-column-color {
    height: 30px;
  }
}
.coalType-management {
  background-color: #fff;
  border-radius: 12px;
}
</style>
