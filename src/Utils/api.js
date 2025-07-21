import axiosInstance from "./axios-api";

// CATEGORY
export function createMapCategory(params = {}) {
    return axiosInstance.post('/product/category/mapping/create', {
        ...params
    }).then(res => res.data).catch(e => e?.response?.data);
}
export function createCategory(params = {}) {
    return axiosInstance.post('/product/category/add', {
        ...params
    }).then(res => res.data).catch(e => e?.response?.data);
}

export function getCategory(params) {
    return axiosInstance.get('/product/category/list', {
        params: params
    }).then(res => res.data);
}
export function getMapingCategory(params) {
    return axiosInstance.get('/product/category/mapping/list', {
        params: params
    }).then(res => res.data);
}

export function deleteCategory(categoryId) {
    return axiosInstance.delete(`/product/category/${categoryId}`).then(res => res.data);
}
export function deleteMapingCategory(categoryId) {
    return axiosInstance.delete(`/product/category/mapping/${categoryId}`).then(res => res.data);
}

// VENDOR

export function getVendorList(params) {
    return axiosInstance.get('/auth/admin/vendor/list', {
        params: params
    }).then(res => res.data);
}

export function getVendorDetails(vendorId) {
    return axiosInstance.get(`/auth/admin/vendor/details/${vendorId}`).then(res => res.data);
}
// CREATOR

export function getCreatorList(params) {
    return axiosInstance.get('/auth/admin/creator/list', {
        ...params
    }).then(res => res.data);
}
export function postCreatorApprovedReject(params) {
    return axiosInstance.post('/auth/admin/creator/approve-reject', {
        ...params
    }).then(res => res.data).catch(e => e);
}
export function postVendorApprovedReject(params) {
    return axiosInstance.post('/auth/admin/vendor/approve-reject', {
        ...params
    }).then(res => res.data).catch(e => e);
}

export function getCreatorDetails(vendorId) {
    return axiosInstance.get(`/auth/admin/creator/details/${vendorId}`).then(res => res.data);
}