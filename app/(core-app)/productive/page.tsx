import ProductiveData from "@/components/layouts/ProductiveData";
import React, { Suspense } from "react";

const ProductivePage = async () => {
  return (
    <div>
      <h1>Productivity</h1>

      <Suspense fallback={<div>Loading</div>}>
        <ProductiveData />
      </Suspense>
    </div>
  )
};

export default ProductivePage;
