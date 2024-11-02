<template>
  <div class="coal-warning">
    <div class="header">
      <div class="title">煤量预警</div>
      <el-button type="primary" @click="handleClick()" size="small" class="editBtn">添加预警规则</el-button>
      <div class="tips">
        <div>系统分别支持高报三级预警，低报三级预警</div>
        <div>高报:指定料场或总量分别高于三级预警值时，系统提示报警</div>
        <div>低报:指定料场或总量分别低于三级预警值时，系统提示报警</div>
      </div>
    </div>
    <el-table v-loading="state.dataListLoading" :data="dataList" show-overflow-tooltip border style="width: 100%">
      <el-table-column prop="stockGround" label="料场" header-align="center" align="center"></el-table-column>
      <el-table-column prop="upperLevel" label="高级一级(吨)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="upperSecondary" label="高级二级(吨)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="upperThird" label="高级三级(吨)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="lowerLevel" label="低级一级(吨)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="lowerSecondary" label="低级二级(吨)" header-align="center" align="center"></el-table-column>
      <el-table-column prop="lowerLevelThree" label="低级三级(吨)" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="170">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="state.dialogVisible" title="报警值设置" width="800" @close="handleClose">
      <el-form :rules="rules" :model="formData" label-width="80px" ref="dataFormRef">
        <el-form-item prop="stockGround" label="料场" class="role-list">
          <el-select v-model="formData.stockGround" placeholder="请选择">
            <el-option v-for="item in stockGroundList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <div class="dialog-box">
          <div class="dialog-box-detail">
            <el-divider content-position="center">高报(吨)</el-divider>
            <div style="padding-right: 40px">
              <el-form-item prop="upperLevel" label="一级">
                <el-input v-model="formData.upperLevel" />
              </el-form-item>
              <el-form-item prop="upperSecondary" label="二级">
                <el-input v-model="formData.upperSecondary" />
              </el-form-item>
              <el-form-item prop="upperThird" label="三级">
                <el-input v-model="formData.upperThird" />
              </el-form-item>
            </div>
          </div>
          <div class="dialog-box-detail">
            <el-divider content-position="center">低报(吨)</el-divider>
            <div style="padding-right: 40px">
              <el-form-item prop="lowerLevel" label="一级">
                <el-input v-model="formData.lowerLevel" />
              </el-form-item>
              <el-form-item prop="lowerSecondary" label="二级">
                <el-input v-model="formData.lowerSecondary" />
              </el-form-item>
              <el-form-item prop="lowerLevelThree" label="三级">
                <el-input v-model="formData.lowerLevelThree" />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSumbit()"> 确认 </el-button>
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
    stockGround: 300,
    upperLevel: 300,
    upperSecondary: 600,
    upperThird: 900,
    lowerLevel: 300,
    lowerSecondary: 600,
    lowerLevelThree: 900
  },
  {
    stockGround: 300,
    upperLevel: 300,
    upperSecondary: 600,
    upperThird: 900,
    lowerLevel: 300,
    lowerSecondary: 600,
    lowerLevelThree: 900
  }
]);

const state = reactive({
  dataListLoading: false,
  dialogVisible: false
});

const stockGroundList = ref([
  {
    id: 1,
    name: "煤矿C"
  }
]);

const formData = reactive({
  stockGround: null,
  upperLevel: "",
  upperSecondary: "",
  upperThird: "",
  lowerLevel: "",
  lowerSecondary: "",
  lowerLevelThree: ""
});

const rules = ref({
  stockGround: [{ required: true, message: "料场不能为空", trigger: "change" }]
});

const handleClose = () => {
  dataFormRef.value.resetFields();
};

const handleClick = () => {
  state.dialogVisible = true;
};
const handleEdit = (id: number) => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    console.log(formData, "------formData");
    state.dialogVisible = false;
  });
};
const handleSumbit = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    console.log(formData, "------formData");
    state.dialogVisible = false;
  });
};

const handleDelete = (id: number) => {};
</script>

<style lang="less" scoped>
.coal-warning {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  .header {
    display: flex;
    padding-bottom: 20px;

    .title {
      font-weight: 700;
      text-align: center;
      margin: auto 0;
    }
    .editBtn {
      margin: auto 8px;
    }
    .tips {
      margin-left: 32px;
      font-size: 12px;
      color: #f77904;
      line-height: 22px;
    }
  }

  .dialog-box {
    display: flex;
    justify-content: space-between;
    &-detail {
      width: 48%;
    }
  }
}
</style>
