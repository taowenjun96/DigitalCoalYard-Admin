<template>
  <el-dialog v-model="visible" title="修改分层" :close-on-click-modal="false" :close-on-press-escape="false" @close="handleClose()">
    <el-form :model="dataForm" :rules="rules" ref="dataFormRef" label-width="90px">
      <div style="display: flex">
        <el-row>
          <div style="border: 4px solid; border-radius: 6px; padding: 4px; margin: 4px" v-for="(item, index) in dataForm" :key="index">
            <el-col :span="22">
              <el-form-item label="分层名称">
                <el-input v-model.number="item.layerName" type="text" autocomplete="off" disabled />
              </el-form-item>
              <el-form-item label="开始高度">
                <el-input v-model.number="item.startHigh" placeholder="请输入" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item label="结束高度">
                <el-input v-model.number="item.endHigh" placeholder="请输入" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item label="煤种">
                <el-select v-model="item.coalType" placeholder="请选择" clearable>
                  <el-option :label="data.name" v-for="data in coalTypeList" :key="data.id" :value="data.name">{{ data.name }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="密度">
                <el-input v-model.number="item.coalDensity" placeholder="请输入" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="item.color" color-format="rgb" />
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </div>
    </el-form>
    <template v-slot:footer>
      <el-button @click="handleClose()">取消启用</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">确定启用</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { getLayerDataByAreaName, clearLayerDataByAreaName, updateLayerDataByAreaName } from "@/api/infoManagementApi";
import { ElMessage } from "element-plus";
const emit = defineEmits(["refreshDataList"]);

const visible = ref(false);
const dataFormRef = ref();
const areaName = ref();

let coalTypeList = reactive([
  {
    id: "",
    name: ""
  }
]);

let dataForm = reactive([
  {
    layerName: null,
    startHigh: null,
    endHigh: null,
    coalType: null,
    coalDensity: null,
    color: "rgb(0, 0, 0)"
  },
  {
    layerName: null,
    startHigh: null,
    endHigh: null,
    coalType: null,
    coalDensity: null,
    color: "rgb(0, 0, 0)"
  },
  {
    layerName: null,
    startHigh: null,
    endHigh: null,
    coalType: null,
    coalDensity: null,
    color: "rgb(0, 0, 0)"
  },
  {
    layerName: null,
    startHigh: null,
    endHigh: null,
    coalType: null,
    coalDensity: null,
    color: "rgb(0, 0, 0)"
  },
  {
    layerName: null,
    startHigh: null,
    endHigh: null,
    coalType: null,
    coalDensity: null,
    color: "rgb(0, 0, 0)"
  },
  {
    layerName: null,
    startHigh: null,
    endHigh: null,
    coalType: null,
    coalDensity: null,
    color: "rgb(0, 0, 0)"
  }
]);

const rules = ref({
  Name: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  Density: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  Weight: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  Start: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  End: [
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
  Type: [
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
  areaName.value = params.areaName;
  coalTypeList = [];
  params.coalType.split(",").map((item: any) => {
    let obj = {
      id: item.trim(),
      name: item.trim()
    };
    coalTypeList.push(obj);
  });

  getLayerDataByAreaName({ areaName: params.areaName }).then((res) => {
    const { data } = res;
    data.forEach((item: any, index: any) => {
      if (dataForm[index]) {
        dataForm[index].layerName = item.layerName;
        dataForm[index].startHigh = item.startHigh;
        dataForm[index].endHigh = item.endHigh;
        dataForm[index].coalType = item.coalType;
        dataForm[index].coalDensity = item.coalDensity;
        dataForm[index].color = `rgb${item.color}`; // 转换颜色格式
      }
    });
  });
};

// 表单提交
const dataFormSubmitHandle = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    let newData = JSON.parse(JSON.stringify(dataForm));
    let params = newData
      .filter((item: any) => item.coalType) // 过滤掉空对象
      .map((item: any) => ({
        color: item.color.replace("rgb", ""), // 转换颜色格式
        layerName: item.layerName,
        coalType: item.coalType,
        coalDensity: item.coalDensity,
        startHigh: item.startHigh,
        endHigh: item.endHigh
      }));

    updateLayerDataByAreaName({
      ...params
    }).then((res: any) => {
      if (!res.code) {
        ElMessage.success({
          message: "启用成功",
          duration: 500,
          onClose: () => {
            visible.value = false;
            emit("refreshDataList");
          }
        });
      } else {
        ElMessage.error({
          message: res.msg,
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
  clearLayerDataByAreaName({ areaName:areaName.value }).then((res) => {
    if (!res.code) {
      ElMessage.success({
        message: "取消启用成功",
        duration: 500
      });
    } else {
      ElMessage.error({
        message: res.msg,
        duration: 500
      });
    }
    visible.value = false;
    dataFormRef.value.resetFields();
  });
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
