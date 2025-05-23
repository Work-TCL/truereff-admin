import * as Yup from "yup";

export const addCategory = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    parentCategory: Yup.string().optional()
});