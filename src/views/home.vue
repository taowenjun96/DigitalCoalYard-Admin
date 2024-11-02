<!-- 系统概览System Summary -->
<template>
  <div class="system-summary">
    <!-- 左边盒子 -->
    <div class="box-left">
      <div class="box-left-top bg-c">
        <div class="tops">
          <div class="total-quantity-title">
            <div>当前总煤量:</div>
            <div style="margin: 0 4px">110522.15</div>
            <div>吨</div>
          </div>
          <el-button type="success" :icon="Sunrise">正常</el-button>
        </div>
        <div class="footers">
          <div class="footers-main">
            <div class="footers-text" style="border-right: 2px solid #afb2b5">
              <div>0吨</div>
              <div>本月进煤量</div>
            </div>
            <div style="width: 100px; height: 100px">
              <span class="iconfont icon-jinmei" style="margin-left: 20px"></span>
            </div>
          </div>
          <div class="footers-main">
            <div class="footers-text">
              <div>0吨</div>
              <div>本月耗煤量</div>
            </div>
            <span class="iconfont icon-haomei" style="margin-left: 20px"></span>
          </div>
        </div>
      </div>
      <div class="box-left-main">
        <div class="main-box bg-c">
          <div>平均热值</div>
          <div>12.94</div>
        </div>
        <div class="main-box bg-c">
          <div>平均硫分</div>
          <div>12.94</div>
        </div>
        <div class="main-box bg-c">
          <div>平均挥发</div>
          <div>12.94</div>
        </div>
        <div class="main-box bg-c">
          <div>平均水分</div>
          <div>12.94</div>
        </div>
      </div>
      <div class="box-left-footer bg-c">
        料场信息(吨)
        <MyCharts :dataSource="dataSourceBar" :canvasWidth="canvasWidthBar" :canvasHeight="canvasHeightBar"></MyCharts>
      </div>
    </div>

    <!-- 右侧盒子 -->
    <div class="box-right">
      <div class="box-right-top bg-c">
        <div class="title-box">煤种(吨)</div>
        <MyCharts :dataSource="dataSourcePie" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight"></MyCharts>
      </div>
      <div class="box-right-main bg-c">
        <div class="title-box">皮带秤累计煤量(吨)</div>
        <div class="main-details">
          <div class="tops">
            <div class="main-title">C8</div>
            <div>
              <span style="font-size: 14px">更新时间：</span>
              <span style="color: #f77904">2023-03-14 12:29:56</span>
            </div>
          </div>

          <div style="font-weight: 700">取煤量：16361吨</div>
        </div>
        <div class="main-details">
          <div class="tops">
            <div class="main-title">C8</div>
            <div>
              <span style="font-size: 14px">更新时间：</span>
              <span style="color: #f77904">2023-03-14 12:29:56</span>
            </div>
          </div>

          <div style="font-weight: 700">取煤量：16361吨</div>
        </div>
        <div class="main-details">
          <div class="tops">
            <div class="main-title">C8</div>
            <div>
              <span style="font-size: 14px">更新时间：</span>
              <span style="color: #f77904">2023-03-14 12:29:56</span>
            </div>
          </div>

          <div style="font-weight: 700">取煤量：16361吨</div>
        </div>
      </div>
      <div class="box-right-footer bg-c">
        <div class="footer-table-title">来煤信息</div>

        <el-table :data="tableData" style="width: 100%" height="230">
          <el-table-column prop="date" label="批次号" />
          <el-table-column prop="name" label="矿点" />
          <el-table-column prop="address" label="重量(吨)" /> 
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sunrise } from "@element-plus/icons-vue";
import MyCharts from "@/components/charts.vue";
import { onMounted, ref, watch, onBeforeUnmount, reactive } from "vue";

const props = defineProps({
  xDataArray: {
    // 柱形图x轴数据
    type: Array,
    default: function () {
      return ["煤场A", "煤场B", "煤场C", "煤场D"];
    }
  },
  yDataArray: {
    //图标信息提示
    type: Array,
    default: function () {
      return [
        {
          // name: "图例二",
          type: "bar",
          label: {
            // 柱状图上的文字设置
            show: true, // 是否显示
            //   rotate: 60, // 文字旋转角度
            position: "top" // 显示位置
          },
          // barWidth: '50%', // 柱的宽度
          barGap: "5%", // 多个并排柱子设置柱子之间的间距
          data: [10530.25, 10834.05, 31464.4, 50001]
        },
        {
          // name: "图例三",
          type: "bar",
          label: {
            show: true, // 是否显示
            position: "top" // 显示位置
          },
          barGap: "5%", // 多个并排柱子设置柱子之间的间距
          data: [0, 20000, 50000, 0]
        }
      ];
    }
  }
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189"
  }
];

const dataSourceBar = reactive({
  title: [],
  legend: {
    //图标信息提示
    type: "scroll",
    orient: "horizontal",
    right: "50%",
    left: "40%",
    top: 0,
    //   bottom: 20,
    align: "auto",
    icon: "circle"
  },
  grid: {
    //图表距离边框的偏离
    right: "1%", //图表距离容器右侧距离
    left: "6%",
    top: "22%",
    bottom: "20%"
  },
  tooltip: { trigger: "axis" }, // 设置图案和容器的距离
  xAxis: {
    type: "category",
    nameLocation: "end",
    data: props.xDataArray,

    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: "value",
    nameLocation: "end",
    min: 0,
    axisLabel: {
      formatter: "{value}吨"
    }
  },
  series: props.yDataArray
});
const canvasWidthBar = ref("");
const canvasHeightBar = ref("450px");

const dataSourcePie = reactive({
  title: {},
  legend: {
    orient: "vertical",
    left: "left",
    show: true
  },
  series: [
    {
      name: "煤场A",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2
      },
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 0, name: "未填写" },
        { value: 0, name: "烟煤" },
        { value: 0, name: "石灰粉" },
        { value: 0, name: "渣" },
        { value: 0, name: "尿素" },
        { value: 0, name: "生石灰粉" },
        { value: 0, name: "笋壳" },
        { value: 0, name: "脱硫灰" }
      ]
    }
  ]
});
const canvasWidth = ref("");
const canvasHeight = ref("240px");
</script>

<style lang="less" scoped>
.system-summary {
  display: flex;
  .bg-c {
    background-color: #fff;
    border-radius: 8px;
  }

  .icon-haomei {
    font-size: 80px;
    color: rgb(230, 14, 14);
  }
  .icon-jinmei {
    font-size: 80px;
    color: rgb(25, 0, 255);
  }
  .box-left {
    width: 73%;
    margin-right: 16px;

    &-top {
      padding: 15px;
      .tops {
        display: flex;
        justify-content: space-between;
        .total-quantity-title {
          display: flex;
          height: 28px;
          line-height: 28px;
        }
      }
      .footers {
        margin-top: 30px;
        display: flex;
        &-main {
          width: 50%;
          .footers-text {
            font-size: 16px;
            margin-left: 30%;
          }
        }
      }
    }
    &-main {
      margin: 16px 0;
      display: flex;
      justify-content: space-between;
      .main-box {
        width: 24%;
        text-align: center;
        padding: 8px 0;
        font-weight: 600;
        font-size: 16px;
      }
    }

    &-footer {
      padding: 16px;
      height: 454px;
    }
  }

  .box-right {
    width: 27%;
    height: 80vh;

    &-top {
      padding: 15px;
    }
    &-main {
      margin: 16px 0;
      padding: 10px 16px;
      .main-details {
        margin-top: 10px;
        .tops {
          display: flex;
          align-items: center;
          .main-title {
            width: 60px;
            color: rgb(25, 0, 255);
          }
        }
      }
    }
    &-footer {
      padding: 8px;
      .footer-table-title {
        padding: 8px 0;
      }
    }
  }
}
</style>
