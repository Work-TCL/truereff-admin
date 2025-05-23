import axiosInstance from "./axios-api";

export function createCategory(params = {}) {
    return axiosInstance.post('/product/category/add', {
        ...params
    }).then(res => res.data);
}

export function getCategory(params) {
    return axiosInstance.get('/product/category/list', {
        params: params
    }).then(res => res.data);
}

export function deleteCategory(categoryId) {
    return axiosInstance.delete(`/product/category/${categoryId}`).then(res => res.data);
}