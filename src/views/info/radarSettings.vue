<!-- 雷达设置  -->
<template>
  <div class="coalType-management">
    <div class="header">
      <div class="theme">雷达设置</div>
      <el-button type="primary" size="small" @click="handleDelete()">重置标高</el-button>
    </div>
    <div class="main">
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column prop="id" label="编号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="backDistance" label="后方间距(米)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="leftDistance" label="左边间距(米)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="groundDistance" label="原始标高(米)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="defaultGroundDistance" label="默认标高(米)" header-align="center" align="center"></el-table-column>

        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="220">
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="handleAddCoalType(scope.row.id)"
              ><el-icon><EditPen /></el-icon>修改标高</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" title="修改标高" width="500">
      <el-form :inline="true" :model="formData" ref="dataFormRef">
        <el-form-item label="标高" prop="density">
          <el-input v-model="formData.newGroundDistance" type="text" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-button @click="handleClosed()">取消</el-button>
        <el-button type="primary" @click="handleUpdateRadarData()">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onActivated } from "vue";
import { getAllRadarData, updateRadarData, resetRadarData } from "@/api/infoManagementApi";
import { ElMessage } from "element-plus";

const state = reactive({
  dataListLoading: false,
  dataList: []
});
const formData = reactive({
  Id: null,
  newGroundDistance: null
});
const dialogVisible = ref(false);
const dataFormRef = ref();

onActivated(() => {
  getDataList();
});

const getDataList = () => {
  getAllRadarData().then((res) => {
    const { data } = res;
    state.dataList = data;
  });
};

// 添加分区
const handleAddCoalType = (id: any) => {
  dialogVisible.value = true;
  formData.Id = id;
};

// 设置标高
const handleUpdateRadarData = () => {
  let params = JSON.parse(JSON.stringify(formData));
  params.Id = Number(params.Id);
  params.newGroundDistance = Number(params.newGroundDistance);
  updateRadarData(params).then((res) => {
    const { code, msg } = res;
    if (!code) {
      ElMessage.success("设置成功");
    } else {
      ElMessage.error(msg);
    }
    getDataList();
    dialogVisible.value = false;
    formData.Id = null;
    formData.newGroundDistance = null;
  });
};

const handleClosed = () => {
  dialogVisible.value = false;
  formData.Id = null;
  formData.newGroundDistance = null;
};
// 重置
const handleDelete = () => {
  resetRadarData().then((res) => {
    const { code, msg } = res;
    if (!code) {
      ElMessage.success("重置成功");
    } else {
      ElMessage.error(msg);
    }
    getDataList();
  });
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
.coalType-management {
  background-color: #fff;
  border-radius: 12px;
}
</style>
