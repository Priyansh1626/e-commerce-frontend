import React, { useState, useEffect } from "react";
import { useStateValue } from "./stateManager/StateProvider";
import CheckoutProducts from "./CheckoutProducts";
import { Link } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./stateManager/reducer";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [{ basket, user }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    if (basket.length > 0) {
      try {
        const getClientSecret = async () => {
          const response = await axios.post(
            `/checkout/payment/create?total=${getBasketTotal(basket) * 100}`
          ,{
            withCredentials: true,
          });
          setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
      } catch (error) {
        console.log("internal server error");
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [basket]);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        navigate("/orders", { replace: true });

        const placeOrder = async () => {
          const response = await axios.post(
            `/storeorder`,
            {
              id: paymentIntent.id,
              order: basket,
              amount: paymentIntent.amount / 100,
            },
            {
              withCredentials: true,
            }
          );
          // console.log(response.data.user);
          dispatch({
            type: "SET_USER",
            user: response.data.user,
          });
          // console.log(response.data.user);
        };
        placeOrder();
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
      });
  };

  const handleChange = (e) => {
    if (e.complete === false) {
      setComplete(true);
    } else {
      setComplete(false);
    }
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <>
      {user ? (
        <section className="payment">
          <div className="payment-container">
            <h1>
              <Link to={"/checkout"} className="nav-link">
                <span>Checkout ({basket?.length} items)</span>
              </Link>
            </h1>
            <div className="payment-section">
              <div className="payment-title">
                <h2>Delivary address</h2>
              </div>
              <div className="payment-address">
                <p>
                  {user
                    ? `${user?.address[0].locality},`
                    : "Please enter the address"}
                </p>
                <p>{user && `${user?.address[0].city}, `}</p>
                <p>{user && user?.address[0].state}</p>
              </div>
            </div>
            <div className="payment-section">
              <div className="payment-title">
                <h2>Review items and delivery</h2>
              </div>
              <div className="payment-items">
                {basket.map((item, i) => (
                  <CheckoutProducts
                    key={i}
                    id={item.id}
                    title={item.title}
                    img={item.img}
                    price={item.price}
                    rating={item.rating}
                    category={item.category}
                    qnt={item.qnt}
                  />
                ))}
              </div>
            </div>
            <div className="payment-section">
              <div className="payment-title">
                <h2>Payment Method</h2>
              </div>
              <div className="payment-details">
                <form onSubmit={handleSubmit}>
                  <h2>Card Details</h2>
                  <CardElement
                    onChange={handleChange}
                    className="payment-card-details"
                  />
                  {error && <div className="card-error">{error}</div>}
                  <div className="total-payment-container">
                    <div className="payment-price-container">
                      <CurrencyFormat
                        renderText={(value) => <h2>Order Total:{value}</h2>}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        prefix={"Rs "}
                        thousandSeparator={true}
                      />
                      <button
                        disabled={
                          processing || disabled || complete || succeeded
                        }
                      >
                        <span>{processing ? "Processing" : "Buy Now"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>Please login to acces payment</section>
      )}
    </>
  );
}
