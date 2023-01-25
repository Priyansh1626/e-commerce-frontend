import React, { useState } from "react";
import logo from "../../images/form-logo.png";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../stateManager/StateProvider";

export default function SignIn() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [message, setmessage] = useState("");
  const [error, setError] = useState(false);

  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...User,
      [name]: value,
    });
  };

  const signin = async (e) => {
    e.preventDefault();
    const { email, password } = User;
    if (email && password) {
      const resp = await axios.post("/auth/signin", User, {
        withCredentials: true,
      });
      if (resp.data.user) {
        setUser({
          email: "",
          password: "",
        });
        dispatch({
          type: "SET_USER",
          user: resp.data.user,
        });
        dispatch({
          type: "SET_ORDER",
          order: resp.data.user.orders,
        });
        navigate("/");
        setError(false);
        setmessage("");
      } else {
        setError(true);
        setmessage("Inmessage Credentials");
      }
    } else {
      setError(true);
      setmessage("Please enter all the fields");
    }
  };

  return (
    <>
      <section className="signin-container">
        <form>
          <Link to="/" className="form-logo">
            <img src={logo} alt="" />
          </Link>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            name="email"
            value={User.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            name="password"
            value={User.password}
            onChange={handleChange}
          />
          <div style={{ marginTop: "1rem", color: "red", fontSize: "1.3rem" }}>
            {error && message}
          </div>

          <button className="signin-btn" onClick={signin}>
            Sign in
          </button>

          <div className="info">
            <p>
              By signing-in you agree to Amazon's-Colne Conditions of Use &
              Sale. Please see our Privacy Notice, our Cookies Notice and our
              Interest-Based Ads Notice.
            </p>
          </div>
          <span className="ask-new-customer">New to Amazon?</span>
          <Link to="/auth/register">
            <button className="signup-btn">Create an Amazon Account</button>
          </Link>
        </form>
      </section>
    </>
  );
}
