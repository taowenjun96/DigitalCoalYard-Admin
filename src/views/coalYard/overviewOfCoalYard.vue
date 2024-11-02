<!-- 煤场总览 -->
<!-- overviewOfCoalYard -->
<template>
  <div class="bucket-wheel-management">
    <div class="header">
      <div class="theme">1号煤棚</div>
    </div>
    <div class="main">
      <el-card class="coal-yard-detail">
        <div class="card-coal-yard">
          <div class="card">
            <div class="detail-title">煤棚总量：</div>
            <div class="detail-num">21364.3吨</div>
          </div>
          <div class="card">
            <div class="detail-title">煤棚A：</div>
            <div class="detail-num">21364.3吨</div>
          </div>
        </div>
      </el-card>
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column type="index" label="序号" header-align="center" align="center" width="90px"></el-table-column>
        <el-table-column prop="partitionName" label="分区名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="stock" label="存量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="calorificValue" label="热值" header-align="center" align="center"></el-table-column>
        <el-table-column prop="volatilization" label="挥发" header-align="center" align="center"></el-table-column>
        <el-table-column prop="sulfurContent" label="硫分" header-align="center" align="center"></el-table-column>
        <el-table-column prop="coalType" label="煤种" header-align="center" align="center"></el-table-column>
        <el-table-column prop="availableCoalQuantity" label="可用煤量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="section" label="区间" header-align="center" align="center"></el-table-column>
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
      id: 1,
      partitionName: "分区A-1",
      stock: "10520.25吨",
      calorificValue: "0",
      volatilization: "0",
      sulfurContent: "0",
      coalType: "烟煤",
      availableCoalQuantity: "0",
      section: "0"
    },
    {
      id: 2,
      partitionName: "分区A-2",
      stock: "10520.25吨",
      calorificValue: "0",
      volatilization: "0",
      sulfurContent: "0",
      coalType: "烟煤",
      availableCoalQuantity: "0",
      section: "0"
    },
    {
      id: 3,
      partitionName: "分区A-3",
      stock: "10520.25吨",
      calorificValue: "0",
      volatilization: "0",
      sulfurContent: "0",
      coalType: "烟煤",
      availableCoalQuantity: "0",
      section: "0"
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
  .coal-yard-detail {
    background-color: rgb(232.8, 233.4, 234.6);
    .card-coal-yard {
      display: flex;
      .card {
        display: flex;
        width: 20%;
        .detail-title {
          color: rgb(115.2, 117.6, 122.4);
          font-weight: 800;
        }
        .detail-num {
          font-weight: 800;
        }
      }
    }
  }
}
.bucket-wheel-management {
  background-color: #fff;
  border-radius: 12px;
}
</style>
