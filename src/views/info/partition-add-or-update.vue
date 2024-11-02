<template>
  <el-dialog v-model="visible" title="修改分区" :close-on-click-modal="false" :close-on-press-escape="false" @close="handleClose()">
    <el-form :model="dataForm" :rules="rules" ref="dataFormRef" @keyup.enter="dataFormSubmitHandle()" label-width="120px">
      <el-form-item label="分区名称">
        <el-input v-model.number="dataForm.areaName" disabled placeholder="请输入名称" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密度" prop="coalDensity">
        <el-input v-model.number="dataForm.coalDensity" placeholder="请输入名称" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="重量" prop="coalWeight">
        <el-input v-model.number="dataForm.coalWeight" placeholder="请输入名称" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用本分区">
        <el-switch v-model="dataForm.isUse" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
      </el-form-item>
      <el-form-item label="初始长度(米)" prop="startPos">
        <el-input v-model.number="dataForm.startPos" placeholder="请输入" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="截止长度(米)" prop="endPos">
        <el-input v-model.number="dataForm.endPos" placeholder="请输入" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="煤种" prop="coalType">
        <el-input v-model="dataForm.coalType" placeholder="请输入煤种" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker v-model="dataForm.color" color-format="rgb" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="handleClose()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { editInfoArea } from "@/api/infoManagementApi";
import { ElMessage } from "element-plus";
const emit = defineEmits(["refreshDataList"]);

const visible = ref(false);
const dataFormRef = ref();

let dataForm = reactive({
  id: null,
  areaName: null,
  coalDensity: null,
  coalWeight: null,
  isUse: true,
  startPos: null,
  endPos: null,
  coalType: "",
  color: "rgb(255, 0, 0)"
});

const rules = ref({
  coalDensity: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  coalWeight: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  startPos: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endPos: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  startWidth: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endWidth: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  coalType: [
    {
      required: true,
      message: "请输入",
      trigger: "change"
    }
  ]
});

const init = (data?: any) => {
  visible.value = true;
  let params = JSON.parse(JSON.stringify(data));
  params.color = `rgb${params.color}`;

  dataForm.id = params.id;
  dataForm.areaName = params.areaName;
  dataForm.coalDensity = params.coalDensity;
  dataForm.coalWeight = params.coalWeight;
  dataForm.isUse = params.isUse;
  dataForm.startPos = params.startPos;
  dataForm.endPos = params.endPos;
  dataForm.coalType = params.coalType;
  dataForm.color = `rgb${params.color}`;
};

// 表单提交
const dataFormSubmitHandle = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    let params = JSON.parse(JSON.stringify(dataForm));
    params.color = params.color.slice(3);

    editInfoArea({
      ...params
    }).then((res: any) => {
      if (!res.code) {
        ElMessage.success({
          message: "修改成功",
          duration: 500,
          onClose: () => {
            visible.value = false;
            emit("refreshDataList");
          }
        });
      } else {
        ElMessage.error({
          message: "修改失败",
          duration: 500,
          onClose: () => {
            visible.value = false;
            emit("refreshDataList");
          }
        });
      }
    });
  });
};

const handleClose = () => {
  visible.value = false;
  dataFormRef.value.resetFields();
};

defineExpose({
  init
});
</script>

<style lang="less" scoped>
.mod-sys__user {
  .role-list {
    .el-select {
      width: 100%;
    }
  }
}
</style>
