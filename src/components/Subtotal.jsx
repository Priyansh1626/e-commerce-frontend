import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./stateManager/reducer";
import { useStateValue } from "./stateManager/StateProvider";
import { useNavigate } from "react-router-dom";

export default function Subtotal() {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <div className="sub-box">
              <p>
                Subtotal ({basket.length} items):
                <strong> {` ${value}`} </strong>
              </p>
              <small className="subtotal-gift">
                <input type="checkbox" id="subtotal-gift-checkbox" />
                <label htmlFor="subtotal-gift-checkbox">
                  This order contains a gift
                </label>
              </small>

              <button
                disabled={!basket.length}
                onClick={(e) => navigate("/checkout/payment")}
                title={basket.length ? "" : "Please add items to the basket"}
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        prefix={"Rs "}
        thousandSeparator={true}
      />
    </div>
  );
}
