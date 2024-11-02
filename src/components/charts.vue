<template>
  <div>
    <div :id="uid" :style="style"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { EChartsType } from "echarts";
const props = defineProps({
  dataSource: {
    type: Object,
    default: null,
    required: true
  },
  canvasWidth: {
    default: "100%",
    required: true
  },
  canvasHeight: {
    type: String,
    default: "",
    required: true
  }
});
const uid = ref("");
let myEchart: EChartsType;
// 时间戳+随机字符
uid.value = new Date().getTime() + Math.random().toString(32).slice(2, 10);
// console.log("uid:", uid.value);

let style = computed(() => ({
  width: props.canvasWidth,
  height: props.canvasHeight
}));
// console.log("style:", style.value);

const init = () => {
  // 基于准备好的dom，初始化echarts实例
  myEchart= echarts.init(document.getElementById(uid.value));
  // 绘制图表
  myEchart.setOption(props.dataSource, { notMerge: true });
};
onMounted(() => {
  // nextTick(() => {
  //     init()
  // })
  init();
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
<style scoped></style>
