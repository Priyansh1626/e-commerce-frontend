import React from "react";
import HomeCarasol from "./HomeCarasol";
import HomeProducts from "./HomeProducts";

export default function Home() {
  return (
    <section className="home">
      <div className="home-container">
        <HomeCarasol />
        <div className="home-big-product-container">
          <HomeProducts />
        </div>
      </div>
    </section>
  );
}
