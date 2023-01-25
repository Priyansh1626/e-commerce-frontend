import React from "react";
import CheckoutProducts from "./CheckoutProducts";
import { useStateValue } from "./stateManager/StateProvider";
import Subtotal from "./Subtotal";

export default function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <>
      <section className="checkout">
        <div className="checkout-container">
          <div className="checkout-left">
            <img
              className="checkout-ad"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/GiftCards/LPAIndia/Header/170_AP_1500x300.jpg"
              alt=""
            />
            <div className="basket-container">
              <div className="checkout-title">
                <h2>Your shopping Basket</h2>
              </div>
              {basket.map((item, i) => (
                <CheckoutProducts
                  key={i}
                  id={item.id}
                  title={item.title}
                  img={item.img}
                  price={item.price}
                  rating={item.rating}
                  category={item.category}
                  subCategory={item.subCategory}
                  qnt={item.qnt}
                />
              ))}
            </div>
          </div>
          <div className="checkout-right">
            <Subtotal />
          </div>
        </div>
      </section>
    </>
  );
}
