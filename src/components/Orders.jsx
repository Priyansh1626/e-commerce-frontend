import React from "react";
import Order from "./Order";
import { useStateValue } from "./stateManager/StateProvider";

export default function Orders() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <>
      {user ? (
        <section className="orders">
          <h1>Your orders</h1>
          <div className="orders-order">
            {user.orders.map((order, i) => (
              <Order key={i} count={i} order={order} />
            ))}
          </div>
        </section>
      ) : (
        <section>Please login </section>
      )}
    </>
  );
}
