import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { mapCategory } from "../../../Utils/validations";
import Modal from "../../common/Modal";
import Input from "../../common/Input";
import {
  // createCategory,
  createMapCategory,
  getCategory,
} from "../../../Utils/api";
import { toastMessage } from "../../../Utils/toast-message";

function AddEditMapingModel({
  isOpen = false,
  refreshCentral = () => {},
  setIsOpen = () => {},
  // category = undefined,
}) {
  const [loading, setLoading] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [vendorCategories, setVendorCategories] = useState([]);
  const [creatorCategories, setCreatorCategories] = useState([]);
  const methods = useForm({
    defaultValues: {
      creatorCategory: "",
      vendorCategory: "",
    },
    resolver: yupResolver(mapCategory),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("0909090909---->>", data);

    try {
      const res = await createMapCategory({
        creatorCategory: data?.creatorCategory,
        vendorCategory: data?.vendorCategory,
      });
      if (res?.status === 201) {
        toastMessage.success(res?.message || "Category add successfully.");
        setIsOpen(false);
        setLoading(false);
        refreshCentral();
        methods.reset({
          creatorCategory: "",
          vendorCategory: "",
        });
        return true;
      }
      throw res;
    } catch (e) {
      console.log("while create category", e);
      toastMessage.error(e?.message || "Category Create Failed.");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async (type = "vendor") => {
    try {
      let data = await getCategory({
        type: type,
      });
      console.log("data--cat", data?.data);
      if (data?.status === 200) {
        data = data?.data;
        if (type === "vendor") {
          setVendorCategories(
            data?.data
              ?.filter((val) => val && !Boolean(val?.parentId))
              ?.map((t) => ({ label: t?.name, value: t?._id }))
          );
        } else {
          setCreatorCategories(
            data?.data
              ?.filter((val) => val && !Boolean(val?.parentId))
              ?.map((t) => ({ label: t?.name, value: t?._id }))
          );
        }
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getCategories("vendor");
    getCategories("creator");
  }, []);

  return (
    <Modal
      title="Map Category"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      {/* {loading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 z-[999]">
          Loading...
        </div>
      ) : (
        ""
      )} */}
      <div className="min-w-[320px] md:min-w-[500px]">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-2 text-left gap-3 w-full"
          >
            <div className="col-span-2">
              <Input
                name="vendorCategory"
                type="react-select"
                placeholder="select vendor category"
                label="Vendor Category"
                required={false}
                options={vendorCategories}
              />
            </div>
            <div className="col-span-2">
              <Input
                name="creatorCategory"
                type="react-select"
                placeholder="select creator category"
                label="Creator Category"
                required={false}
                options={creatorCategories}
              />
            </div>
            <div class="col-span-2 flex items-center pt-4 md:pt-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                disabled={loading}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                type="button"
                disabled={loading}
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}

export default AddEditMapingModel;
