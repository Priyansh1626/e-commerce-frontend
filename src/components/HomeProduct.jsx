import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./stateManager/StateProvider";

export default function HomeProduct({ img, id, title, price, rating }) {
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
      <div className="title">{title.slice(0, 65) + "....."}</div>
      <div className="price-container">
        <div className="price-box">
          Price{" "}
          <b>
            <CurrencyFormat
              value={Number(price)}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
            />
          </b>
        </div>
      </div>
      <div className="rating-container">
        <div className="rating-box">
          {Array(Number(rating))
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>
      </div>
    </div>
  );
}
