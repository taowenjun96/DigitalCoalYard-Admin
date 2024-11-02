<!-- 矿点管理  mineManagement-->
<template>
  <div class="mine-management">
    <div class="header">
      <div class="theme">矿点管理</div>
      <el-button type="primary" size="small" @click="handleAddMine()">添加矿点</el-button>
    </div>
    <div class="main">
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column prop="index" label="编号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="mineName" label="矿点名称" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center">
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="handleAddMine(scope.row.id)"
              ><el-icon><EditPen /></el-icon>编辑</el-button
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
import AddOrUpdate from "./mine-add-or-update.vue";

const addOrUpdateRef = ref();

const state = reactive({
  dataListLoading: false,
  dataList: [
    {
      id: "1",
      index: "10",
      mineName: "东坑洋"
    },
    {
      id: "2",
      index: "62",
      mineName: "全骏达"
    }
  ]
});

const getDataList = () => {};
// 编辑
const handleAddMine = (id?: number) => {
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
}
.mine-management {
  background-color: #fff;
  border-radius: 12px;
}
</style>
