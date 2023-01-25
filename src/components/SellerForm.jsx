import axios from "./axios";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import logo from "../images/form-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./stateManager/StateProvider";

export default function SellerForm() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [seller, setSeller] = useState({
    name: "",
    phone: "",
    email: "",
    adhar: "",
    locality: "",
    city: "",
    state: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
    if (name !== "") {
      setError(false);
    }
  };

  const makeSeller = async (e) => {
    e.preventDefault();
    const { name, email, phone, adhar, locality, city, state } = seller;
    if (name && email && adhar && phone && locality && city && state) {
      try {
        const response = await axios.patch(
          "/api/sellerdetails",
          {
            isSeller: true,
            name,
            email,
            phone,
            adhar,
            locality,
            city,
            state,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.user) {
          setSeller({
            name: "",
            phone: "",
            email: "",
            adhar: "",
            locality: "",
            city: "",
            state: "",
          });
          dispatch({
            type: "SET_USER",
            user: response.data.user,
          });
          navigate("/seller/myproducts");
        } else {
          setError(true);
          setMessage("Internal serder error occured");
        }
      } catch (e) {
        setError(true);
        setMessage("Internal serder error occured");
      }
    } else {
      setError(true);
      setMessage("Please enter all fields");
    }
  };

  return (
    <>
      <section className="seller-form">
        <form>
          <Link to="/" className="form-logo">
            <img src={logo} alt="" />
          </Link>
          <label htmlFor="name">
            Name<span>*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            name="name"
            value={seller.name}
            onChange={handleChange}
          />
          <label htmlFor="email">
            Bussiness Email<span>*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            name="email"
            value={seller.email}
            onChange={handleChange}
          />
          <label htmlFor="phone">
            Phone<span>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            required
            name="phone"
            value={seller.phone}
            onChange={handleChange}
          />
          <label htmlFor="adhar">
            Adhar Card<span>*</span>
          </label>
          <CurrencyFormat
            type="tel"
            id="adhar"
            placeholder="Enter adhar number"
            format="#### #### #### ####"
            required
            name="adhar"
            value={seller.adhar}
            onChange={handleChange}
          />
          <label htmlFor="locality">
            Address<span>*</span>
          </label>
          <input
            type="text"
            id="locality"
            placeholder="Enter locality"
            required
            name="locality"
            value={seller.locality}
            onChange={handleChange}
          />
          <div className="address-line2">
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              required
              name="city"
              value={seller.city}
              onChange={handleChange}
            />
            <input
              type="text"
              id="state"
              placeholder="Enter state"
              required
              name="state"
              value={seller.state}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: "1rem", color: "red", fontSize: "1.3rem" }}>
            {error && message}
          </div>

          <button className="signup-btn" onClick={makeSeller}>
            Confirm
          </button>
          <div className="info">
            <p>
              By signing-up you agree to Amazon's-Colne Conditions of Use &
              Sale. Please see our Privacy Notice, our Cookies Notice and our
              Interest-Based Ads Notice.
            </p>
          </div>
          <Link to="/" style={{ margin: "auto", textDecoration: "none" }}>
            <span className="ask-new-customer">Back to Home ?</span>
          </Link>
        </form>
      </section>
    </>
  );
}
