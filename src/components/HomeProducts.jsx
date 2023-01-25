import React, { useEffect } from "react";
// import Grid from "@mui/material/Grid";
import HomeProduct from "./HomeProduct";
import axios from "./axios";
import { useStateValue } from "./stateManager/StateProvider";
import Grid from "@mui/material/Grid";

export default function HomeProducts() {
  const [{ allProducts }, dispatch] = useStateValue();

  const uniqueCategories = [
    ...new Set(
      allProducts.map((curr) => {
        return curr.category;
      })
    ),
  ];

  const uniquesubCategory = [
    ...new Set(
      allProducts.map((curr) => {
        return curr.subCategory;
      })
    ),
  ];

  useEffect(() => {
    const populateproducts = async () => {
      const response = await axios.get("/api/getallproducts");
      dispatch({
        type: "SET_ALL_PRODUCTS",
        allProducts: response.data.allproducts,
      });
    };
    populateproducts();
  }, []);

  return (
    <>
      <div className="top-layer-container" style={{ color: "black" }}>
        {/* to be expanded so that u can see all subctagories products here */}
        {/* <div className="subcategory">
          <div className="heading">Top categoires</div>
          <div className="product-container">
            {uniqueCategories.map((elm, i) => (
              <div className="all-categoires">{elm}</div>
            ))}
          </div>
        </div> */}
        <Grid container spacing={2}>
          {uniqueCategories.slice(0, 4).map((elm, i) => (
            <Grid key={i} item xs={3} className="first-row">
              <div className="top-layer-box">
                <div className="top-layer-heading">{elm}</div>
                <div className="sub-cat-container">
                  {allProducts.subCategory}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          {uniqueCategories.slice(0, 2).map((elm, i) => (
            <Grid key={i} item xs={6} className="second-row">
              <div className="top-layer-box width50">
                <div className="top-layer-heading">{elm}</div>
                <div className="sub-cat-container">
                  {allProducts.subCategory}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          {uniqueCategories.slice(0, 3).map((elm, i) => (
            <Grid key={i} item xs={4} className="second-row">
              <div className="top-layer-box widthwala">
                <div className="top-layer-heading">{elm}</div>
                <div className="sub-cat-container">
                  {allProducts.subCategory}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      {uniquesubCategory.map((elm, i) => (
        <div key={i} className="subcategory">
          <div className="heading">{elm}</div>
          <div className="product-container">
            {allProducts
              .filter((x) => x.subCategory === elm)
              .map((element, i) => (
                <HomeProduct
                  key={i}
                  id={element.id}
                  title={element.title}
                  price={element.price}
                  img={element.img}
                  rating={element.rating}
                  category={element.category}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
