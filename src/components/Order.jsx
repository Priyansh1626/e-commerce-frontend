import React from "react";
import CheckoutProducts from "./CheckoutProducts";

export default function Order({ order, count }) {
  console.log(order);

  return (
    <div className="order">
      <h2>Order {count + 1}</h2>
      <p>
        <strong>Date: </strong>
        {order.date.slice(0, 17)}
      </p>
      <p>
        <strong>Amount: </strong>
        Rs {order.amount}
      </p>
      <p className="order-id">
        <strong>Payment_id: </strong>
        {order.paymentId}
      </p>
      {order.order.map((item, i) => (
        <CheckoutProducts
          key={i}
          id={item.id}
          title={item.title}
          img={item.img}
          price={item.price}
          rating={item.rating}
          qnt={item.qnt}
        />
      ))}
    </div>
  );
}
