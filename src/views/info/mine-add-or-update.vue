<!-- 编辑矿点 -->
<template>
  <el-dialog v-model="visible" :title="!dataForm.id ? '添加矿点' : '修改矿点'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="rules" ref="dataFormRef" @keyup.enter="dataFormSubmitHandle()" label-width="120px">
      <el-form-item label="编号" prop="index">
        <el-input v-model.number="dataForm.index" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名称" prop="mineName">
        <el-input v-model.number="dataForm.mineName" type="text" autocomplete="off" />
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
  mineName: "",
  
});

const rules = ref({
  index: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
  mineName: [
    {
      required: true,
      message: "请输入",
      trigger: "blur"
    }
  ],
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
