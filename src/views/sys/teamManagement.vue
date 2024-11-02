<template>
  <div class="team-management">
    <el-form :inline="true" :model="state.dataForm" @keyup.enter="state.getDataList()">
      <el-form-item>
        <el-input v-model="state.dataForm.username" placeholder="班组" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <ren-select v-model="state.dataForm.gender" dict-type="gender" placeholder="性别"></ren-select>
      </el-form-item> -->
      <el-form-item>
        <ren-dept-tree v-model="state.dataForm.deptId" placeholder="选择部门" :query="true"></ren-dept-tree>
      </el-form-item>
      <el-form-item>
        <el-button @click="state.getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.hasPermission('sys:user:save')" type="primary" @click="addOrUpdateHandle()">新增班组</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="state.dataListLoading" :data="state.dataList" border @selection-change="state.dataListSelectionChangeHandle" @sort-change="state.dataListSortChangeHandle" style="width: 100%">
      <el-table-column prop="teamName" label="班组名称" header-align="center" align="center"></el-table-column>
      <el-table-column prop="times" label="时间范围" header-align="center" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="300">
        <template v-slot="scope">
          <el-button v-if="state.hasPermission('sys:user:update')" type="warning" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
          <el-button v-if="state.hasPermission('sys:user:delete')" type="danger" @click="state.deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="state.page" :page-sizes="[10, 20, 50, 100]" :page-size="state.limit" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="state.pageSizeChangeHandle" @current-change="state.pageCurrentChangeHandle"> </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdateRef" @refreshDataList="state.getDataList"></add-or-update>
  </div>
</template>

<script lang="ts" setup>
import useView from "@/hooks/useView";
import { reactive, ref, toRefs } from "vue";
import AddOrUpdate from "./team-add-or-update.vue";

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

const editUserId = ref();
const addOrUpdateRef = ref();

// 编辑
const addOrUpdateHandle = (id?: number) => {
  addOrUpdateRef.value.init(id);
};
</script>

<style lang="less" scoped>
.team-management {
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
