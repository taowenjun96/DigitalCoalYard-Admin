<!-- 分区管理 -->
<template>
  <div class="partition-management">
    <div class="header">
      <div class="theme">分区管理</div>
    </div>
    <div class="main">
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" row-key="id">
        <el-table-column prop="areaName" label="分区名称" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="isUse" label="是否启用本分区" header-align="center" align="center">
          <template v-slot="scope">
            <p v-if="scope.row.isUse" style="color: blue">启用</p>
            <p v-else style="color: red">停止</p>
          </template>
        </el-table-column>
        <el-table-column label="是否启用分层" header-align="center" align="center">
          <template v-slot="scope">
            <p v-if="scope.row.isUseLayer" style="color: blue">启用</p>
            <p v-else style="color: red">停止</p>
          </template>
        </el-table-column>
        <el-table-column prop="coalBelongGround" label="所属料场" header-align="center" align="center"></el-table-column>
        <el-table-column label="长度范围(米)" header-align="center" align="center">
          <template v-slot="scope">
            <p>{{ scope.row.startPos }}~{{ scope.row.endPos }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="coalType" label="煤种" header-align="center" align="center" width="300"></el-table-column>
        <el-table-column prop="coalDensity" label="密度" header-align="center" align="center"></el-table-column>
        <el-table-column prop="coalWeight" label="重量" header-align="center" align="center"></el-table-column>
        <el-table-column label="颜色" header-align="center" align="center">
          <template v-slot="scope">
            <div class="table-column-color" :style="`background:rgb${scope.row.color}`"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="240">
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="handleAddPartition(scope.row)"
              ><el-icon><EditPen /></el-icon>修改</el-button
            >
            <el-button type="success" size="small" @click="handleAvailableCoalQuantity(scope.row)">分层设置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
      <hierarchical-setting ref="hierarchicalSettingRef" @refreshDataList="getDataList"></hierarchical-setting>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onActivated } from "vue";
import AddOrUpdate from "./partition-add-or-update.vue";
import HierarchicalSetting from "./hierarchicalSetting.vue";
import { getInfoAreaList } from "@/api/infoManagementApi";

const addOrUpdateRef = ref();
const hierarchicalSettingRef = ref();

const state = reactive({
  dataListLoading: false,
  dataList: []
});

onActivated(() => {
  getDataList();
});

const getDataList = () => {
  getInfoAreaList().then((res) => {
    state.dataList = res.data;
  });
};

// 添加分区
const handleAddPartition = (data: Object) => {
  addOrUpdateRef.value.init(data);
};

// 分层设置
const handleAvailableCoalQuantity = (data: Object) => {
  hierarchicalSettingRef.value.init(data);
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
  .table-column-color {
    height: 30px;
  }
}
.partition-management {
  background-color: #fff;
  border-radius: 12px;
}
</style>
