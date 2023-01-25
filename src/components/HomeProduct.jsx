import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./stateManager/StateProvider";

export default function HomeProduct({ img, id }) {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  const productDetail = (id) => {
    dispatch({
      type: "SET_PRODUCT_DETAIL_ID",
      productDetailId: id,
    });

    navigate("/productdetails");
  };

  return (
    <div className="product" onClick={() => productDetail(id)}>
      <img src={img} alt="" />
    </div>
  );
}
