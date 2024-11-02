import baseService from "@/service/baseService";

// 获取分区数据
export async function getInfoAreaList() {
    return baseService.get("/area/getAllAreaData")
}

// 修改分区
export async function editInfoArea(params:any) {
    return baseService.post("/area/updateAreaData",params)
}

// 获取分层信息
export async function getLayerDataByAreaName(params:any) {
    return baseService.get("/area/getLayerDataByAreaName",params)
}

// 取消分层启用
export async function clearLayerDataByAreaName(params:any) {
    return baseService.post("/area/clearLayerDataByAreaName",params)
}

// 更新（添加）分层数据
export async function updateLayerDataByAreaName(params:any) {
    return baseService.post("/area/updateLayerDataByAreaName",params)
}

// 查询雷达
export async function getAllRadarData() {
    return baseService.get("/radar/getAllRadarData")
}

// 设置雷达默认标高
export async function updateRadarData(params:any) {
    return baseService.get("/radar/updateRadarData",params)
}

// 重置雷达默认标高
export async function resetRadarData() {
    return baseService.post("/radar/resetRadarData")
}
