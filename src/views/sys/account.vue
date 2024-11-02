<template>
  <div class="account">
    <el-form :inline="true" :model="state.dataForm" @keyup.enter="state.getDataList()">
      <el-form-item>
        <el-input v-model="state.dataForm.username" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <ren-dept-tree v-model="state.dataForm.deptId" placeholder="选择部门" :query="true"></ren-dept-tree>
      </el-form-item>
      <el-form-item>
        <el-button @click="state.getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.hasPermission('sys:user:save')" type="primary" @click="addOrUpdateHandle()">新增账号</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="state.dataListLoading" :data="state.dataList" border @selection-change="state.dataListSelectionChangeHandle" @sort-change="state.dataListSortChangeHandle" style="width: 100%">
      <el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
      <el-table-column prop="realName" label="姓名" header-align="center" align="center"></el-table-column>
      <el-table-column prop="team" label="班组" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="400">
        <template v-slot="scope">
          <el-button v-if="state.hasPermission('sys:user:update')" type="success" @click="notificationPermission(scope.row.id)">通知权限</el-button>
          <el-button v-if="state.hasPermission('sys:user:update')" type="warning" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
          <el-button v-if="state.hasPermission('sys:user:delete')" type="danger" @click="state.deleteHandle(scope.row.id)">删除</el-button>
          <el-button v-if="state.hasPermission('sys:user:update')" type="info" @click="resetPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.limit" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="state.pageSizeChangeHandle" @current-change="state.pageCurrentChangeHandle"> </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdateRef" @refreshDataList="state.getDataList"></add-or-update>

    <el-dialog v-model="dialogVisible" width="800" @close="initDialog()">
      <template #header>
        <div class="my-header">
          <div class="dialogTitle">通知权限设置</div>
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"> 全选 </el-checkbox>
        </div>
      </template>

      <div class="checkBoxAll">
        <div class="checkbox-main">
          <div class="main-title">堆取料</div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-row>
              <el-col v-for="city in cities" :key="city" :span="12">
                <el-checkbox :label="city" :value="city">
                  {{ city }}
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
        <div class="checkbox-main">
          <div class="main-title">盘料</div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-row>
              <el-col v-for="city in cities" :key="city" :span="12">
                <el-checkbox :label="city" :value="city">
                  {{ city }}
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmCheck()"> 提交修改 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useView from "@/hooks/useView";
import { reactive, ref, toRefs, watch } from "vue";
import AddOrUpdate from "./user-add-or-update.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const view = reactive({
  getDataListURL: "/sys/user/page",
  getDataListIsPage: true,
  deleteURL: "/sys/user",
  deleteIsBatch: true,
  exportURL: "/sys/user/export",
  dataForm: {
    username: "",
    deptId: "",
    postId: ""
  }
});

const state = reactive({ ...useView(view), ...toRefs(view) });

const dialogVisible = ref(false);
const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedCities = ref<any[]>([]);
const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];
const editUserId = ref();
const addOrUpdateRef = ref();

// 打开通知权限
const notificationPermission = (id: number) => {
  dialogVisible.value = true;
  editUserId.value = id;
};

// 全选操作
const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
};
// 单个勾选操作
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};

// 通知权限提交修改
const confirmCheck = () => {
  dialogVisible.value = false;
  console.log(checkedCities.value, "----提交----", editUserId.value);
  initDialog();
};

// 通知权限dialog重置
const initDialog = () => {
  checkedCities.value = [];
  editUserId.value = null;
  isIndeterminate.value = false;
};
watch(
  isIndeterminate,
  (newV, oldV) => {
    console.log("person发生了变化", newV, oldV);
  },
  { deep: true, immediate: true }
);

// 编辑
const addOrUpdateHandle = (id?: number) => {
  addOrUpdateRef.value.init(id);
};
// 重置密码
const resetPassword = (data: any) => {
  ElMessageBox.confirm(`是否重置账号${data.username}的密码?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    overflow: true
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "重置成功"
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "重置取消"
      });
    });
};
</script>

<style lang="less" scoped>
.account {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  .my-header {
    display: flex;
    text-align: center;

    .dialogTitle {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      font-size: 15px;
    }
  }

  .checkBoxAll {
    display: flex;

    .checkbox-main {
      border: 1px solid red;
    }

    .main-title {
      font-weight: 600;
    }
  }
}
</style>
