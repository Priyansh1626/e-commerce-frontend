import React, { useState } from "react";
import logo from "../../images/form-logo.png";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
// import { axiosConfig } from "../stateManager/reducer";

export default function Signup() {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
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
    },
    withCredentials: true,
  };

  const signup = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, locality, city, state } = User;
    if (name && email && password && phone && locality && city && state) {
      const resp = await axios.post("/auth/signup", User, {
        withCredentials: true,
      });
      if (resp.data.user) {
        setUser({
          name: "",
          email: "",
          password: "",
          phone: "",
          locality: "",
          city: "",
          state: "",
        });
        navigate("/auth/login");
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
            placeholder="Enter name"
            required
            name="name"
            value={User.name}
            onChange={handleChange}
          />
          <label htmlFor="email">
            Email<span>*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            name="email"
            value={User.email}
            onChange={handleChange}
          />
          <label htmlFor="password">
            Password<span>*</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            name="password"
            value={User.password}
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
            value={User.phone}
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
            value={User.locality}
            onChange={handleChange}
          />
          <div className="address-line2">
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              required
              name="city"
              value={User.city}
              onChange={handleChange}
            />
            <input
              type="text"
              id="state"
              placeholder="Enter state"
              required
              name="state"
              value={User.state}
              onChange={handleChange}
            />
          </div>
          <button className="signup-btn" onClick={signup}>
            Sign up
          </button>
          <div className="info">
            <p>
              By signing-up you agree to Amazon's-Colne Conditions of Use &
              Sale. Please see our Privacy Notice, our Cookies Notice and our
              Interest-Based Ads Notice.
            </p>
          </div>
          <Link
            to="/auth/login"
            style={{ margin: "auto", textDecoration: "none" }}
          >
            <span className="ask-new-customer">Already a Users?</span>
          </Link>
        </form>
      </section>
    </>
  );
}
