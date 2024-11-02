<template>
  <div class="storage-time-warning">
    <div class="header">
      <div class="title">存放时间预警</div>
      <el-button type="primary" @click="handleClick()" size="small" class="editBtn">修改预警规则</el-button>
      <div class="tips">系统支持三级预警，煤堆存放时间分别高于三级预警值时，系统提示报警</div>
    </div>
    <el-table v-loading="state.dataListLoading" :data="dataList" show-overflow-tooltip border style="width: 100%">
      <el-table-column prop="primaryAlarm" label="一级警报值(天)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="secondAlarm" label="二级警报值(天)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="thirdAlarm" label="三级警报值(天)" header-align="center" align="center"></el-table-column>
    </el-table>
    <el-dialog v-model="state.dialogVisible" title="报警值设置" width="500" @close="handleClose">
      <el-form :model="formData" label-width="80px" ref="dataFormRef">
        <el-form-item label="一级">
          <el-input v-model="formData.primaryAlarm" />
        </el-form-item>
        <el-form-item label="二级">
          <el-input v-model="formData.secondAlarm" />
        </el-form-item>
        <el-form-item label="三级">
          <el-input v-model="formData.thirdAlarm" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEdit()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
const dataFormRef = ref();
const dataList = reactive([
  {
    primaryAlarm: '300',
    secondAlarm: '600',
    thirdAlarm: '900'
  }
]);

const state = reactive({
  dataListLoading: false,
  dialogVisible: false
});

const formData = reactive({
  primaryAlarm: "",
  secondAlarm: "",
  thirdAlarm: ""
});

const handleClose = () => {
  formData.primaryAlarm = "";
  formData.secondAlarm = "";
  formData.thirdAlarm = "";
};

const handleClick = () => {
  state.dialogVisible = true;
  formData.primaryAlarm = dataList[0].primaryAlarm;
  formData.secondAlarm = dataList[0].secondAlarm;
  formData.thirdAlarm = dataList[0].thirdAlarm;
};
const handleEdit = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    console.log(formData, "------formData");
    state.dialogVisible = false;
  });
};
</script>

<style lang="less" scoped>
.storage-time-warning {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  .header {
    display: flex;
    text-align: center;
    padding: 14px 0;

    .title {
      font-weight: 700;
      text-align: center;
      margin: auto 0;
    }
    .editBtn {
      margin: 0 40px 0 8px;
    }
    .tips {
      font-size: 12px;
      color: #f77904;
      text-align: center;
      line-height: 22px;
    }
  }
}
</style>
