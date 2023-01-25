import React from "react";
import { Col, Row } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

export default function MyProducts({ title, price, rating, img }) {
  return (
    <>
      <Row style={{ margin: "0rem" }}>
        <Col md={4} style={{ padding: "1rem" }}>
          <div className="product">
            <div className="product-info">
              <p className="product-title">{title}</p>
              <p className="product-price">
                <small>Rs </small>
                <b>
                  <CurrencyFormat
                    value={Number(price)}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                  />
                </b>
              </p>
              <div className="product-rating">
                {Array(Number(rating))
                  .fill()
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
            </div>
            <img src={img} alt="" />
          </div>
        </Col>
      </Row>
    </>
  );
}
