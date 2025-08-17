import React, { useEffect, useRef } from "react";
import "./AllOrders.module.css";
import toast from "react-hot-toast";

export default function AllOrders() {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      toast.success("Order Placed Successfully!", {
        duration: 4000,
        position: "top-right",
      });
      hasShownToast.current = true;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-semibold text-green-700">
        ✅ Order Placed Successfully
      </h2>
    </div>
  );
}
