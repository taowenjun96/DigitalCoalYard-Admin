<template>
  <div class="container-echart">
    <div :id="'echart-bar' + timeId" class="interface-echart"></div>
  </div>
  <div class="container-echart-pie" >
    <MyCharts :dataSource="dataSource" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight"></MyCharts>
    <MyCharts :dataSource="dataSource2" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight"></MyCharts>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { EChartsType } from "echarts";
import { onMounted, ref, watch, onBeforeUnmount, reactive } from "vue";
import MyCharts from "./charts.vue";
const num = ref(100);
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
let myEchart: EChartsType;

const dataSource = reactive({
  title: {
    text: "煤场A", //主标题文本
    left: "center",
    top: "0%",
    textStyle: {
      fontSize: 12
    }
  },
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
const dataSource2 = reactive({
  title: {
    text: "煤场B", //主标题文本
    left: "center",
    top: "0%",
    textStyle: {
      fontSize: 12
    }
  },
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
const canvasWidth = ref("800px");
const canvasHeight = ref("400px");

const timeId = ref(Math.floor(new Date().getTime() * Math.random())); // 使该图表保持唯id
const myEchartData = () => {
  const option = {
    title: [
      {
        text: "料场煤量(吨)",
        left: 10,
        textStyle: {
          fontSize: 18,
          fontWeight: "bold"
        }
      },
      {
        text: "当前总量:" + num.value + "吨",
        left: 140,
        textStyle: {
          fontSize: 14,
          fontWeight: "bold"
        }
      }
    ],
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
  };
  // { notMerge: true } 解决删除数据时,数据不刷新的问题
  myEchart.setOption(option, { notMerge: true });
};

watch(
  //监控数据变化
  () => props.xDataArray,
  () => {
    setTimeout(() => {
      myEchartData();
    }, 500);
  },
  { deep: true }
);
watch(
  //监控数据变化
  () => props.yDataArray,
  () => {
    setTimeout(() => {
      myEchartData();
    }, 500);
  },
  { deep: true }
);
onMounted(() => {
  setTimeout(() => {
    const dom = document.getElementById(`echart-bar${timeId.value}`) as any;
    myEchart = echarts.init(dom);
    myEchartData();
  }, 500);

  // 当窗口发生变化时
  window.addEventListener("resize", () => {
    myEchart.resize();
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    myEchart.resize();
  });
});
</script>
<style scoped lang="scss">
.container-echart {
  background-color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.interface-echart {
  width: 100%;
  height: 300px;
}
.container-echart-pie {
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
