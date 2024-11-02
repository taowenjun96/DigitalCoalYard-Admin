import baseService from "@/service/baseService";

// 获取分区信息
export async function loginApi(params:any) {
    return baseService.post("/login",params)
}
