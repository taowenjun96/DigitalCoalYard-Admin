import baseService from "@/service/baseService";

// 新增
export async function addApi(params: any) {
    return baseService.post("/sys/user", params)
}

// 修改
export async function editApi(params: any) {
    return baseService.put("/sys/user", params)
}

// 获取详情信息
export async function getInfoApi(id: any) {
    return baseService.get(`/sys/user/${id}`)
}

// 获取班组列表
export async function getTeamListApi() {
    return baseService.get("/sys/role/list")
}
