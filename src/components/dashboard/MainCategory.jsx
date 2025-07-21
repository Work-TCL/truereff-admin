import React from "react";
import CategoryManagement from "./Category";
import CategoryMappingManagement from "./CategoryMaping";
import { useSearchParams } from "react-router-dom";

export default function MainCategory() {
  const [searchParams] = useSearchParams();
  const isMapping = searchParams.get("isMap") === "true";
  return (
    <>{isMapping ? <CategoryMappingManagement /> : <CategoryManagement />}</>
  );
}
