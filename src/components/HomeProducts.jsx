import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
import HomeProduct from "./HomeProduct";
import axios from "./axios";
import { useStateValue } from "./stateManager/StateProvider";
import Grid from "@mui/material/Grid";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function HomeProducts() {
  const [{ allProducts }, dispatch] = useStateValue();
  const [phones, setPhones] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [footwear, setFootwear] = useState([]);
  const [headphones, setHeadphones] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [fitness, setFitness] = useState([]);

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

  const findSubCategory = async (category) => {
    const response = await axios.post(
      `/api/getsubcategory`,
      {
        category: category,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.subCategory) {
      if (response.data.category === "phones") {
        setPhones(response.data.subCategory);
      } else if (response.data.category === "clothes") {
        setClothes(response.data.subCategory);
      } else if (response.data.category === "footwear") {
        setFootwear(response.data.subCategory);
      } else if (response.data.category === "headphones") {
        setHeadphones(response.data.subCategory);
      } else if (response.data.category === "accessories") {
        setAccessories(response.data.subCategory);
      } else if (response.data.category === "fitness") {
        setFitness(response.data.subCategory);
      }
    } else {
      return [];
    }
  };

  useEffect(() => {
    const populateproducts = async () => {
      const response = await axios.get("/api/getallproducts");
      dispatch({
        type: "SET_ALL_PRODUCTS",
        allProducts: response.data.allproducts,
      });
    };
    populateproducts();
    findSubCategory("phones");
    findSubCategory("clothes");
    findSubCategory("footwear");
    findSubCategory("headphones");
    findSubCategory("accessories");
    findSubCategory("fitness");
    // uniqueCategories.slice(0, 6).forEach((category) => findSubCategory(category));
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
          <Grid item xs={6} className="first-row">
            {uniqueCategories.slice(0, 2).map((elm, i) => (
              <div key={i} className="top-layer-box">
                <div className="top-layer-heading">{elm}</div>
                <div className="sub-cat-container">
                  {elm === "phones"
                    ? phones.map((subcat) => (
                        <div className="sub-cat-sub-container">
                          <div className="img-box">
                            <img
                              src="https://m.media-amazon.com/images/I/715rSRKUlLL._AC_UY327_QL65_.jpg"
                              alt=""
                            />
                          </div>
                          <p>{subcat}</p>
                        </div>
                      ))
                    : footwear.map((subcat) => (
                        <div className="sub-cat-sub-container">
                          <div className="img-box">
                            <img
                              src={
                                subcat === "shoes"
                                  ? "https://m.media-amazon.com/images/I/71cFwyj2EJL._AC_UL480_FMwebp_QL65_.jpg"
                                  : "https://m.media-amazon.com/images/I/71sPet2uQlL._AC_UL480_FMwebp_QL65_.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <p>{subcat}</p>
                        </div>
                      ))}
                </div>
              </div>
            ))}
          </Grid>
          <Grid item xs={6} className="first-row">
            {uniqueCategories.slice(2, 4).map((elm, i) => (
              <div key={i} className="top-layer-box">
                <div className="top-layer-heading">{elm}</div>
                <div className="sub-cat-container">
                  {elm === "clothes"
                    ? clothes.map((subcat) => (
                        <div className="sub-cat-sub-container">
                          <div className="img-box">
                            <img
                              src={
                                subcat === "tops"
                                  ? "https://m.media-amazon.com/images/I/715JkJKZZzL._AC_UL480_FMwebp_QL65_.jpg"
                                  : "https://m.media-amazon.com/images/I/71O1QaI-sbL._AC_UL480_FMwebp_QL65_.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <p>{subcat}</p>
                        </div>
                      ))
                    : headphones.map((subcat) => (
                        <div className="sub-cat-sub-container">
                          <div className="img-box">
                            <img
                              src={
                                subcat === "boat"
                                  ? "https://m.media-amazon.com/images/I/71ISIssoVFL._SY450_.jpg"
                                  : ""
                              }
                              alt=""
                            />
                          </div>
                          <p>{subcat}</p>
                        </div>
                      ))}
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {uniqueCategories.slice(4, 6).map((elm, i) => (
            <Grid key={i} item xs={6} className="second-row">
              <div className="top-layer-box">
                <div className="top-layer-heading">{elm}</div>
                <div className="sub-cat-container">
                  {elm === "accessories"
                    ? accessories.map((subcat) => (
                        <div className="sub-cat-sub-container">
                          <div className="img-box">
                            <img
                              src={
                                subcat === "mens-watches"
                                  ? "https://m.media-amazon.com/images/I/718AVhhc1GL._AC_UL480_FMwebp_QL65_.jpg"
                                  : ""
                              }
                              alt=""
                            />
                          </div>
                          <p>{subcat}</p>
                        </div>
                      ))
                    : fitness.map((subcat) => (
                        <div className="sub-cat-sub-container">
                          <div className="img-box">
                            <img
                              src={
                                subcat === "gym-machines"
                                  ? "https://m.media-amazon.com/images/I/71E+oh38ZqL._AC_UL480_FMwebp_QL65_.jpg"
                                  : ""
                              }
                              alt=""
                            />
                          </div>
                          <p>{subcat}</p>
                        </div>
                      ))}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      {uniquesubCategory.map((elm, i) => (
        <div key={i} className="subcategory">
          <div className="heading">{elm}</div>
          <hr className="heading-hr" />
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
