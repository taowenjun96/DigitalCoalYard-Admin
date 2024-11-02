<template>
  <el-dialog v-model="visible" :title="!dataForm.id ? '添加煤种' : '修改煤种'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="rules" ref="dataFormRef" @keyup.enter="dataFormSubmitHandle()" label-width="120px">
      <el-form-item label="编号" prop="index">
        <el-input v-model.number="dataForm.index" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名称" prop="coalTypeName">
        <el-input v-model.number="dataForm.coalTypeName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密度" prop="density">
        <el-input v-model.number="dataForm.density" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="热度" required>
        <el-col :span="11">
          <el-form-item prop="startCalorificValue">
            <el-input v-model.number="dataForm.startCalorificValue" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endCalorificValue">
            <el-input v-model.number="dataForm.endCalorificValue" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="水分" required>
        <el-col :span="11">
          <el-form-item prop="startWaterContent">
            <el-input v-model.number="dataForm.startWaterContent" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endWaterContent">
            <el-input v-model.number="dataForm.endWaterContent" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="挥发分" required>
        <el-col :span="11">
          <el-form-item prop="startVolatileMatter">
            <el-input v-model.number="dataForm.startVolatileMatter" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endVolatileMatter">
            <el-input v-model.number="dataForm.endVolatileMatter" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="硫分" required>
        <el-col :span="11">
          <el-form-item prop="startSulfurContent">
            <el-input v-model.number="dataForm.startSulfurContent" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endSulfurContent">
            <el-input v-model.number="dataForm.endSulfurContent" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="灰分" required>
        <el-col :span="11">
          <el-form-item prop="startAshContent">
            <el-input v-model.number="dataForm.startAshContent" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endAshContent">
            <el-input v-model.number="dataForm.endAshContent" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model.number="dataForm.description" type="text" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { addApi, editApi, getInfoApi, getTeamListApi } from "@/api/accountApi";
const emit = defineEmits(["refreshDataList"]);

const visible = ref(false);
const roleList = ref<any[]>([]);
const dataFormRef = ref();

const dataForm = reactive({
  id: "",
  index: "",
  coalTypeName: "",
  density: "",
  startCalorificValue: "",
  endCalorificValue: "",
  startWaterContent: "",
  endWaterContent: "",
  startVolatileMatter: "",
  endVolatileMatter: "",
  startSulfurContent: "",
  endSulfurContent: "",
  startAshContent: "",
  endAshContent: "",
  description: ""
});

const rules = ref({
  index: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  coalTypeName: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  density: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  startCalorificValue: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endCalorificValue: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  startWaterContent: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endWaterContent: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  startVolatileMatter: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endVolatileMatter: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  startSulfurContent: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endSulfurContent: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  startAshContent: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endAshContent: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ]
});

const init = (id?: number) => {
  visible.value = true;
  dataForm.id = "";
  // 重置表单数据
  if (dataFormRef.value) {
    dataFormRef.value.resetFields();
  }

  //   初始化进入，调用各个查询接口！！
  Promise.all([getTeamList()]).then(() => {
    if (id) {
      getInfo(id);
    }
  });
};

// 获取班组列表（------>后面需现写接口）
const getTeamList = () => {
  return getTeamListApi().then((res) => {
    roleList.value = res.data;
  });
};

// 获取详情信息
const getInfo = (id: number) => {
  getInfoApi(id).then((res) => {
    Object.assign(dataForm, res.data);
  });
};

// 表单提交
const dataFormSubmitHandle = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    console.log(dataForm.id, dataForm);
    // (!dataForm.id ? addApi : editApi)({
    //   ...dataForm
    // }).then((res) => {
    //   ElMessage.success({
    //     message: "成功",
    //     duration: 500,
    //     onClose: () => {
    //       visible.value = false;
    //       emit("refreshDataList");
    //     }
    //   });
    // });
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
