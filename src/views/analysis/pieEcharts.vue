<template>
  <div ref="main" style="width: 50%; height: 300px; border: 1px solid"></div>
  <!-- <el-button @click="test()">按钮</el-button> -->
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts"; //  按需引入 echarts

const props = defineProps({
    titleName:{
        type:String,
        default:'饼状图标题'
    }
})


const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value
const datas = reactive([
  { value: 0, name: "未填写" },
  { value: 0, name: "烟煤" },
  { value: 0, name: "石灰粉" },
  { value: 0, name: "渣" },
  { value: 0, name: "尿素" },
  { value: 0, name: "生石灰粉" },
  { value: 0, name: "笋壳" },
  { value: 0, name: "脱硫灰" }
]);

onMounted(() => {
  init();
});

const init = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: props.titleName, //主标题文本
      left: "center",
      top: "0%",
      textStyle: {
        fontSize: 12
      }
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
        data: datas
      }
    ]
  };
  myChart.setOption(option);
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = function () {
    // 自适应大小
    myChart.resize();
  };
};
const test = (item: string) => {
  //   datas.map((item) => {
  //     item.value = Number(item.value) + Math.floor(Math.random() * 10);
  //     console.log(item, "----");
  // });
  init();
};
defineExpose({ test });
</script>
<style scoped></style>
