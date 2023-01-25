import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./stateManager/reducer";
import { useStateValue } from "./stateManager/StateProvider";

export default function CheckoutProducts({
  id,
  img,
  title,
  price,
  rating,
  qnt,
}) {
  const [{ basket }, dispatch] = useStateValue();
  const [qntc, setQntc] = useState(qnt);

  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
      qnt: qntc,
    });
  };

  const qntdecrease = (id) => {
    if (qntc >= 1) {
      setQntc(qntc - 1);
      dispatch({
        type: "UPDATE_BASKET",
        id: id,
        qnt: qntc - 1,
      });
    } else {
      qntc = 1;
    }
  };

  const qntincrease = (id) => {
    setQntc(qntc + 1);
    dispatch({
      type: "UPDATE_BASKET",
      id: id,
      qnt: qntc + 1,
    });
  };

  return (
    <>
      <div className="checkout-item">
        <div className="product-img">
          <img src={img} alt="" className="checkout-product-img" />
        </div>
        <div className="product-info">
          <p className="product-title">{title}</p>
          <p className="product-price">
            <small>
              <b> Rs </b>
            </small>
            <b>
              <CurrencyFormat
                value={Number(price)}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
              />
            </b>
          </p>

          <div className="order-qnt-container">
            <span className="qnt-box-left">Quantity : </span>
            <span className="qnt-box-right">{qnt}</span>
          </div>
          <p className="product-rating">
            {Array(Number(rating))
              .fill()
              .map((_, i) => (
                <span key={i}>⭐</span>
              ))}
          </p>
          <div className="quantity-container">
            <div className="qnt-box">
              <button
                className="decrease"
                disabled={qntc === 1}
                onClick={() => qntdecrease(id)}
              >
                -
              </button>
              <div className="qnt-counnt">{qntc}</div>
              <button className="increase" onClick={() => qntincrease(id)}>
                +
              </button>
            </div>
          </div>
          <button className="remove-btn" onClick={() => removeFromBasket(id)}>
            Remove from basket
          </button>
        </div>
      </div>
    </>
  );
}
