import React, { useState } from "react";
import logo from "../../images/form-logo.png";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../stateManager/StateProvider";
// import { axiosConfig } from "../stateManager/reducer";

export default function Signup() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [User, setUser] = useState({
    name: "",
    phone: "",
    locality: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...User,
      [name]: value,
    });
  };

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
    },
  };

  const update = async (e) => {
    e.preventDefault();
    const { name, phone, locality, city, state } = User;
    if (name && phone && locality && city && state) {
      try {
        let resp = await axios.patch(
          "/auth/updateprofile",
          User,
          {
            withCredentials: true,
          }
        );
        console.log(resp);
        if (resp.data.user) {
          setUser({
            name: "",
            phone: "",
            locality: "",
            city: "",
            state: "",
          });
          dispatch({
            type: "SET_USER",
            user: resp.data.user,
          });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter all fields");
    }
  };

  return (
    <>
      <section className="signup-container">
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
            placeholder={user?.name}
            required
            name="name"
            value={User.name}
            onChange={handleChange}
          />
          <label htmlFor="phone">
            Phone<span>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            placeholder={user?.phone}
            required
            name="phone"
            value={User.phone}
            onChange={handleChange}
          />
          <label htmlFor="locality">
            Address<span>*</span>
          </label>
          <input
            type="text"
            id="locality"
            placeholder={user?.address[0].locality}
            required
            name="locality"
            value={User.locality}
            onChange={handleChange}
          />
          <div className="address-line2">
            <input
              type="text"
              id="city"
              placeholder={user?.address[0].city}
              required
              name="city"
              value={User.city}
              onChange={handleChange}
            />
            <input
              type="text"
              id="state"
              placeholder={user?.address[0].state}
              required
              name="state"
              value={User.state}
              onChange={handleChange}
            />
          </div>
          <button className="signup-btn" onClick={update}>
            Update
          </button>
          <div className="info">
            <p>
              By Updating profile you agree to Amazon's-Colne Conditions of Use
              & Sale. Please see our Privacy Notice, our Cookies Notice and our
              Interest-Based Ads Notice.
            </p>
          </div>
          <Link to="/" style={{ margin: "auto", textDecoration: "none" }}>
            <span className="ask-new-customer">Back to Home?</span>
          </Link>
        </form>
      </section>
    </>
  );
}
