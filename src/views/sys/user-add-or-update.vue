<template>
  <el-dialog v-model="visible" :title="!dataForm.id ? '新增账号' : '修改账号'" :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="rules" ref="dataFormRef" @keyup.enter="dataFormSubmitHandle()"
      label-width="120px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="realName" label="姓名">
        <el-input v-model="dataForm.realName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword" label="确认密码" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.confirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="team" label="班组" class="role-list">
        <el-select v-model="dataForm.team" placeholder="班组">
          <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"></el-option>
        </el-select>
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
import { addApi, editApi, getInfoApi, getTeamListApi } from "@/api/accountApi"
const emit = defineEmits(["refreshDataList"]);

const visible = ref(false);
const roleList = ref<any[]>([]);
const dataFormRef = ref();

const dataForm = reactive({
  id: "",
  username: "",
  realName: "",
  password: "",
  confirmPassword: "",
  team: "",

  status: 1
});

const validatePassword = (rule: any, value: string, callback: (e?: Error) => any): any => {
  if (!dataForm.id && !/\S/.test(value)) {
    return callback(new Error("必填项不能为空"));
  }
  callback();
};
const validateConfirmPassword = (rule: any, value: string, callback: (e?: Error) => any): any => {
  if (!dataForm.id && !/\S/.test(value)) {
    return callback(new Error("必填项不能为空"));
  }
  if (dataForm.password !== value) {
    return callback(new Error("确认密码与密码输入不一致"));
  }
  callback();
};

const rules = ref({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  realName: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
  team: [{ required: true, message: "班组不能为空", trigger: "change" }],
  password: [{ required: true, validator: validatePassword, trigger: "blur" }],
  confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: "blur" }],
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
    console.log(dataForm.id, dataForm)
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
