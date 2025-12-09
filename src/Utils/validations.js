import * as Yup from "yup";

export const addCategory = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("type is required"),
    parentCategory: Yup.string().optional()
});
export const mapCategory = Yup.object().shape({
    vendorCategory: Yup.string().required("Vendor Category is required"),
    creatorCategory: Yup.string().required("Creator Category is required"),
});