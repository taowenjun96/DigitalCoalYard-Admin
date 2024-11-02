<!-- 报表管理 -->
<template>
  <div class="report-management">
    <div class="header">
      <div class="theme">报表管理</div>
    </div>
    <div class="main">
      <el-form :inline="true" :model="formData">
        <el-form-item label="时间范围" v-show="state.isShow">
          <el-date-picker v-model="formData.timeData" placeholder="请选择" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
        <el-table-column prop="Time" label="时间" header-align="center" align="center" width="380">
          <template v-slot="scope">
            <p>{{ moment(scope.row.Time).format("YYYY-MM-DD HH:mm:ss") }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="报表名" header-align="center" align="center"> </el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="240">
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="downloadFile(scope.row.Name)"
              ><el-icon><EditPen /></el-icon>下载</el-button
            >
            <el-button type="success" size="small" @click="deleteFile(scope.row.ID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="mypagination" :current-page="state.page" :page-sizes="[10, 20, 50, 100, 200]" :page-size="state.pageSize" :total="state.total" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle"> </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onActivated } from "vue";
import { getReportManagement, deleteReportManagement } from "@/api/historyApi";
import moment from "moment";
import { ElMessage } from "element-plus";

// 搜索条件
const formData = reactive({
  timeData: []
});

const state = reactive({
  isShow: true,
  dataListLoading: false,
  dataList: [],
  page: 1,
  pageSize: 10,
  total: 0
});

onActivated(() => {
  getDataList(1);
});

// 查询接口
const getDataList = (page?: number) => {
  if (page) {
    state.page = page;
  }
  let newDate = JSON.parse(JSON.stringify(formData.timeData));
  if (!newDate) {
    newDate = [];
  }
  let params = {
    startTime: newDate[0],
    endTime: newDate[1],
    page: state.page,
    pageSize: state.pageSize
  };
  getReportManagement(params).then((res) => {
    if (res.code == 0) {
      state.dataList = res.data;
      state.total = res.total;
    }
  });
};

// 分页, 每页条数
const pageSizeChangeHandle = (val: number) => {
  state.page = 1;
  state.pageSize = val;
  getDataList();
};
// 分页, 当前页
const pageCurrentChangeHandle = (val: number) => {
  state.page = val;
  getDataList();
};

const downloadFile = (reportName: string) => {
  var xhr = new XMLHttpRequest();
  // 替换为你服务器上实际的文件 URL
  xhr.open("GET", "/report/" + reportName, true);
  xhr.responseType = "blob";

  xhr.onload = function () {
    if (xhr.status === 200) {
      var blob = xhr.response;
      var link = document.createElement("a");
      link.style.display = "none";
      link.href = window.URL.createObjectURL(blob);
      var currentTime = getNowTime();
      link.download = reportName; // 替换为实际文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  xhr.send();
};
const getNowTime = () => {
  let now = new Date();
  let year = now.getFullYear(); //获取完整的年份(4位,1970-????)
  let month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  let today = now.getDate(); //获取当前日(1-31)
  let hour = now.getHours(); //获取当前小时数(0-23)
  let minute = now.getMinutes(); //获取当前分钟数(0-59)
  let second = now.getSeconds(); //获取当前秒数(0-59)
  let nowTime = "";
  nowTime = year + "-" + fillZero(month) + "-" + fillZero(today) + " " + fillZero(hour) + ":" + fillZero(minute) + ":" + fillZero(second);
  return nowTime;
};

const fillZero = (str: any) => {
  var realNum;
  if (str < 10) {
    realNum = "0" + str;
  } else {
    realNum = str;
  }
  return realNum;
};

const deleteFile = (id: number) => {
  deleteReportManagement({ id }).then((res) => {
    if (res.code == 0) {
      ElMessage.success(res.msg);
    }
    getDataList(1);
  });
};
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid;
  display: flex;
  padding: 16px;
  .theme {
    font-weight: 600;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.main {
  padding: 16px;
}
.report-management {
  background-color: #fff;
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

  .mypagination {
    padding: 0 16px 16px 0;
  }
}
</style>
