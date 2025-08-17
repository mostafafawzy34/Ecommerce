import React from "react";
import "./Loader.module.css";
import { InfinitySpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center ">
      <InfinitySpin
        visible={true}
        width="200"
        color="#0aad0a"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}
