import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./stateManager/StateProvider";
import MyProducts from "./MyProducts";

export default function SellerPage() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const sellProduct = () => {
    navigate("/seller/productform");
  };

  return (
    <>
      <section className="seller-products">
        <Row style={{ margin: "0rem" }}>
          <Col xl={8} className="my-products-left">
            <div className="my-products-title">
              <h2>My products</h2>
            </div>
            <div className="my-product-container">
              <Row>
                {user?.seller.Sproducts.map((elm, i) => (
                  <Col xl={6}>
                    <MyProducts
                      key={i}
                      title={elm.title}
                      price={elm.price}
                      rating={elm.rating}
                      img={elm.img}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col xl={4} className="my-products-right">
            <div className="ask-to-sell-container">
              <h2>Do you want to sell products ? </h2>
              <Button
                className="sellproduct-btn"
                variant="contained"
                onClick={sellProduct}
              >
                Yes
              </Button>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}
