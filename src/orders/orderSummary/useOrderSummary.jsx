
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUpdatedPrice } from "../../api/getUpdatedPrice";

export const useOrderSummaryLogic =  () => {
  const cart = useSelector((state) => state.orders.cart);
  const supplier = useSelector((state) => state.orders.supplier);
  const deliveryDate = useSelector((state) => state.orders.deliveryDate);
  const department = useSelector((state) => state.orders.department);
  const status = useSelector((state) => state.orders.status);
  const isLoading = useSelector(
    (state) => state.orders.loadingStatus.orderDetails
  );
  const isOrderApproved = useSelector((state) => state.orders.isOrderApproved);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += getUpdatedPrice(item.price, item.offer) * item.quantity;
    });
    setTotal(`$${sum.toFixed(2)}`);
  }, [cart]);

  return {
  supplier,
  deliveryDate,
  department,
  status,
  isLoading,
  isOrderApproved,
  total,
  }
}