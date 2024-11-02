<template>
  <el-dialog v-model="visible" title="取料任务" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="rules" ref="dataFormRef" @keyup.enter="dataFormSubmitHandle()" label-width="120px">
      <el-form-item label="料场" prop="zoneId">
        <el-select v-model="dataForm.zoneId" placeholder="请选择" clearable>
          <el-option :label="data.name" v-for="data in zoneList" :key="data.id" :value="data.id">{{ data.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分区" prop="zoneId">
        <el-select v-model="dataForm.zoneId" placeholder="请选择" clearable>
          <el-option :label="data.name" v-for="data in zoneList" :key="data.id" :value="data.id">{{ data.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="斗轮机" prop="bucketWheelMachineId">
        <el-select v-model="dataForm.bucketWheelMachineId" placeholder="请选择" clearable>
          <el-option :label="data.name" v-for="data in bucketWheelMachineList" :key="data.id" :value="data.id">{{ data.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="煤种" prop="coalId">
        <el-select v-model="dataForm.coalId" placeholder="请选择" clearable>
          <el-option :label="data.name" v-for="data in coalList" :key="data.id" :value="data.id">{{ data.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="长度范围(米)" required>
        <el-col :span="11">
          <el-form-item prop="startLength">
            <el-input v-model.number="dataForm.startLength" placeholder="请输入起始长度" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endLength">
            <el-input v-model.number="dataForm.endLength" placeholder="请输入截止长度" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="宽度范围(米)">
        <el-col :span="11">
          <el-form-item prop="startWidth">
            <el-input v-model.number="dataForm.startWidth" placeholder="请输入起始宽度" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endWidth">
            <el-input v-model.number="dataForm.endWidth" placeholder="请输入截止宽度" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="weight" label="重量(吨)">
        <el-input v-model.number="dataForm.weight" placeholder="请输入重量(吨)"></el-input>
      </el-form-item>
      <el-form-item prop="missionTime" label="任务时间">
        <el-date-picker v-model="dataForm.missionTime" type="datetime" placeholder="选择日期时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" />
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
import { ElMessage } from "element-plus";
import { addApi, editApi, getInfoApi, getTeamListApi } from "@/api/accountApi";
const emit = defineEmits(["refreshDataList"]);

const visible = ref(false);
const roleList = ref<any[]>([]);
const dataFormRef = ref();

const dataForm = reactive({
  id: "",
  zoneId: null,
  bucketWheelMachineId: null,
  coalId: null,
  startLength: null,
  endLength: null,
  startWidth: null,
  endWidth: null,
  weight: null,
  missionTime: ""
});

const zoneList = reactive([
  {
    id: 1,
    name: "分区1"
  },
  {
    id: 2,
    name: "分区2"
  },
  {
    id: 3,
    name: "分区3"
  }
]);
const bucketWheelMachineList = reactive([
  {
    id: 1,
    name: "斗轮机1"
  },
  {
    id: 2,
    name: "斗轮机2"
  },
  {
    id: 3,
    name: "斗轮机3"
  }
]);
const coalList = reactive([
  {
    id: 1,
    name: "煤种1"
  },
  {
    id: 2,
    name: "煤种2"
  },
  {
    id: 3,
    name: "煤种3"
  }
]);

const rules = ref({
  zoneId: [
    {
      required: true,
      message: "选择项不可为空",
      trigger: "change"
    }
  ],
  bucketWheelMachineId: [
    {
      required: true,
      message: "选择项不可为空",
      trigger: "change"
    }
  ],
  coalId: [
    {
      required: true,
      message: "选择项不可为空",
      trigger: "change"
    }
  ],
  startLength: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  endLength: [
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
  weight: [
    { required: true, message: "请输入" },
    { type: "number", message: "请输入纯数字" }
  ],
  missionTime: [{ required: true, message: "请选择" }]
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
    console.log(dataForm.id, dataForm);
    if (!valid) {
      return false;
    }
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
