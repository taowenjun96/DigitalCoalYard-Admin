<template>
  <el-dialog v-model="visible" :title="!dataForm.id ? '添加班组' : '修改班组'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="rules" ref="dataFormRef" @keyup.enter="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="teamName" label="名称">
        <el-input v-model="dataForm.teamName" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item prop="startTime" label="开始时间">
        <el-time-picker v-model="dataForm.startTime" placeholder="开始时间" />
      </el-form-item>
      <el-form-item prop="endTime" label="结束时间">
        <el-time-picker v-model="dataForm.endTime" placeholder="结束时间" />
      </el-form-item>
      <el-form-item label="备注" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
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
  teamName: "",
  startTime: "",
  endTime: "",
  remarks: ""
});

const rules = ref({
  teamName: [{ required: true, message: "班组名称不能为空", trigger: "blur" }],
  startTime: [{ required: true, message: "开始时间不能为空", trigger: "blur" }],
  endTime: [{ required: true, message: "开始时间不能为空", trigger: "change" }]
});

const init = (id?: number) => {
  visible.value = true;
  dataForm.id = "";
  // 重置表单数据
  if (dataFormRef.value) {
    dataFormRef.value.resetFields();
  }

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
    (!dataForm.id ? addApi : editApi)({
      ...dataForm
    }).then((res) => {
      ElMessage.success({
        message: "成功",
        duration: 500,
        onClose: () => {
          visible.value = false;
          emit("refreshDataList");
        }
      });
    });
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
