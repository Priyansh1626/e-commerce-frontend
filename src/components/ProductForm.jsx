import React, { useState } from "react";
import logo from "../images/form-logo.png";
import { Link } from "react-router-dom";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./stateManager/StateProvider";
import { maxProductIds, productID } from "./stateManager/reducer";
import { useEffect } from "react";

// NOTE ****** do not productID array as empty, because it has all the ids which has alloted to the products ******

export default function ProductForm() {
  const [{ user }, dispatch] = useStateValue();
  const [id, setID] = useState();
  const navigate = useNavigate();
  const [prod, setProd] = useState({
    title: "",
    price: "",
    img: "",
    rating: "",
    category: "",
    subCategory: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProd({
      ...prod,
      [name]: value,
    });
  };

  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };
  const generateID = (max) => {
    let num = getRandom(max);
    while (productID.includes(num)) {
      num = getRandom(max);
    }
    return num;
  };

  useEffect(() => {
    let num = generateID(maxProductIds);
    setID(num);
  }, []);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
    },
  };

  const newProduct = async (e) => {
    e.preventDefault();

    const { title, price, img, category, rating, subCategory } = prod;
    console.log(prod);

    if (title && price && img && category && rating && subCategory) {
      const deployProduct = async () => {
        try {
          const response = await axios.post(
            "/api/newproduct",
            { title, price, rating, category, id, img, subCategory },
            {
              withCredentials: true,
            }
          );
          console.log(response);
          if (response.data.product) {
            setProd({
              title: "",
              price: "",
              img: "",
              rating: "",
              category: "",
              subCategory: "",
            });
            dispatch({
              type: "SET_USER",
              user: response.data.user,
            });
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const storeProduct = async () => {
        try {
          const response = await axios.post(
            "/api/sellerproducttosell",
            { title, price, rating, category, id, img, subCategory },
            {
              withCredentials: true,
            }
          );

          if (response.data.user) {
            deployProduct();

            dispatch({
              type: "SET_USER",
              user: response.data.user,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      storeProduct();
      productID.push(id);
      // console.log(productID);

      navigate("/seller/myproducts");
    } else {
      alert("Fill the form correctly");
    }
  };

  // do not empty the productID array by mistake

  return (
    <>
      <section className="productform-container">
        <form>
          <Link to="/" className="form-logo">
            <img src={logo} alt="" />
          </Link>
          <div className="ID" style={{ margin: "auto" }}>
            Product ID : {id}
          </div>
          <label htmlFor="title">
            Title<span>*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            required
            name="title"
            value={prod.title}
            onChange={handleChange}
          />
          <label htmlFor="price">
            Price<span>*</span>
          </label>
          <input
            id="price"
            placeholder="Rs 000"
            required
            name="price"
            value={prod.price}
            onChange={handleChange}
          />
          <label htmlFor="img">
            Image link<span>*</span>
          </label>
          <input
            type="text"
            id="img"
            placeholder="Enter image link"
            required
            name="img"
            value={prod.img}
            onChange={handleChange}
          />
          <label htmlFor="rating">
            Rating<span>*</span>
          </label>
          <input
            type="number"
            id="rating"
            placeholder="Ratings(beteen 2 and 5)"
            required
            name="rating"
            value={prod.rating}
            onChange={handleChange}
          />
          <label htmlFor="category">
            Category<span>*</span>
          </label>
          <input
            type="text"
            id="category"
            placeholder="Enter category"
            required
            name="category"
            value={prod.category}
            onChange={handleChange}
          />
          <label htmlFor="subCategory">
            Sub-category<span>*</span>
          </label>
          <input
            type="text"
            id="subCategory"
            placeholder="Enter sub-category"
            required
            name="subCategory"
            value={prod.subCategory}
            onChange={handleChange}
          />
          <button className="create-btn" onClick={newProduct}>
            Create
          </button>
          <div className="info">
            <p>
              By posting new product you agree to Amazon's-Colne Conditions of
              Use & Sale. Please see our Privacy Notice, our Cookies Notice and
              our Interest-Based Ads Notice.
            </p>
          </div>
          <Link to="/" style={{ margin: "auto", textDecoration: "none" }}>
            <span className="ask-new-customer">Back to home?</span>
          </Link>
        </form>
      </section>
    </>
  );
}
