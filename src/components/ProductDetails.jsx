import axios from "./axios";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useStateValue } from "./stateManager/StateProvider";
import CurrencyFormat from "react-currency-format";
// import { axiosConfig } from "./stateManager/reducer";

export default function ProductDetails() {
  const [{ productDetailId, productDetail, basket }, dispatch] =
    useStateValue();
  const [qnt, setQnt] = useState(1);
  // recommended to staore this in localstorage so that even after page reloads we can see the
  // details to selected product.

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
    },
  };

  useEffect(() => {
    const callFunc = async () => {
      const response = await axios.post(
        "/api/getproductwithid",
        { id: productDetailId },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.product) {
        dispatch({
          type: "SET_PRODUCT_DETAILS",
          productDetail: response.data.product,
        });
      } else {
        console.log("not found");
      }
    };
    callFunc();
  }, []);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: productDetail.id,
        title: productDetail.title,
        img: productDetail.img,
        price: productDetail.price,
        rating: productDetail.rating,
        category: productDetail.category,
        subCategory: productDetail.subCategory,
        qnt: qnt,
      },
    });
  };

  // console.log(basket);

  const qntdecrease = (e) => {
    e.preventDefault();
    setQnt(qnt - 1);
  };

  const qntincrease = (e) => {
    e.preventDefault();
    setQnt(qnt + 1);
  };

  return (
    <>
      <section className="porductDetails">
        <Grid container spacing={2} className="productDetails-Grid">
          <Grid item xs={4}>
            <div className="product-image-container">
              <img src={productDetail.img} alt="" />
              <div className="select-images">
                <img src={productDetail.img} alt="" />
                <img src={productDetail.img} alt="" />
                <img src={productDetail.img} alt="" />
                <img src={productDetail.img} alt="" />
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="product-info-container">
              <div className="product-info-title">{productDetail.title}</div>
              <p className="product-price">
                <small> Rs </small>
                <b>
                  <CurrencyFormat
                    value={Number(productDetail.price)}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                  />
                </b>
                <span className="real-price">MRP </span>
                <CurrencyFormat
                  value={Number(productDetail.price) + 900}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                />
              </p>
              <div className="product-rating">
                {Array(Number(productDetail.rating))
                  .fill()
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>

              <div className="quantity-container">
                <div className="qnt-box">
                  <button
                    className="decrease"
                    disabled={qnt === 1}
                    onClick={qntdecrease}
                  >
                    -
                  </button>
                  <div className="qnt-counnt">{qnt}</div>
                  <button
                    className="increase"
                    disabled={qnt === productDetail.maxqnt}
                    onClick={qntincrease}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="add-to-basket-container">
                <button
                  className="add-btn-basket"
                  onClick={() =>
                    addToBasket(
                      productDetail.id,
                      productDetail.img,
                      productDetail.title,
                      productDetail.price,
                      productDetail.rating,
                      productDetail.category,
                      productDetail.subCategory,
                      qnt
                    )
                  }
                >
                  Add to basket
                </button>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            no
          </Grid>
        </Grid>
      </section>
    </>
  );
}
