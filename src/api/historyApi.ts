import baseServiceNode from "@/service/baseServiceNode";

// 获取报警记录数据
export async function getAlarmRecord(params:Object) {
    return baseServiceNode.get("/history/getAlarmRecord",params)
}
// 获取斗轮堆取料机操作日志
export async function getBucketWheelStackerReclaimer(params:Object) {
    return baseServiceNode.get("/history/getBucketWheelStackerReclaimer",params)
}
// 获取斗轮取料机操作日志
export async function getBucketWheelReclaimer(params:Object) {
    return baseServiceNode.get("/history/getBucketWheelReclaimer",params)
}
// 获取盘煤仪操作日志
export async function getCoalPanInstrument(params:Object) {
    return baseServiceNode.get("/history/getCoalPanInstrument",params)
}
// 获取分区密度
export async function getPartitionDensity(params:Object) {
    return baseServiceNode.get("/history/getPartitionDensity",params)
}
// 获取报表管理
export async function getReportManagement(params:Object) {
    return baseServiceNode.get("/history/getReportManagement",params)
}
// 删除报表管理
export async function deleteReportManagement(params:any) {
    return baseServiceNode.delete("/history/deleteReportManagement",params)
}
