import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./stateManager/StateProvider";
import { capitalizeFirstLetter } from "./stateManager/reducer";
import axios from "./axios";
import amazonLogo from "../images/amazon-logo.png";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Avatar from "@mui/material/Avatar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(user.address[0].locality);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
    },
  };

  const signout = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get("/auth/logout",{
        withCredentials: true,
      });
      if (resp.data.message === "logedout") {
        handleClose();
        dispatch({
          type: "EMPTY_BASKET",
        });
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/");
      }
    } catch (error) {
      console.log("not logout beacause of ", error);
    }
  };

  const handleSeller = async (e) => {
    e.preventDefault();
    if (user.isSeller === false) {
      navigate("/sellerForm");
      handleClose();
    } else {
      navigate("/seller/myproducts");
      handleClose();
    }
  };

  return (
    <>
      <header className="header-section">
        <Link to="/" className="nav-link" style={{ margin: "0 2rem" }}>
          <img src={amazonLogo} alt="amazonlogo" className="header-logo" />
        </Link>
        <div className="header-location-container">
          <LocationOnOutlinedIcon className="header-location-icon" />
          <div className="header-option">
            <span className="header-optionline-1">
              {user
                ? `Hello ${user && capitalizeFirstLetter(user?.name)}`
                : "Hello Guest"}
            </span>
            <div className="header-address-option">
              <span className="header-optionline-2">
                {user ? user?.address[0].city : "Select your address"}
              </span>
            </div>
          </div>
        </div>
        <div className="header-search">
          <input type="text" className="header-search-input" />
          <SearchIcon className="header-search-icon" />
        </div>
        <div className="header-nav">
          {user && (
            <Avatar
              className="avtar"
              style={{
                backgroundColor: "purple",
                margin: "1rem",
                marginRight: "1.5rem",
                fontSize: "1.6rem",
              }}
              onClick={handleShow}
            >
              {user && capitalizeFirstLetter(user?.name.slice(0, 1))}
            </Avatar>
          )}
          <Modal show={show} onHide={handleClose} className="profile">
            <Modal.Header className="modal-heading">
              <h1>My Profile</h1>
            </Modal.Header>
            <Modal.Body className="body">
              <div className="flex">
                <div className="left">
                  <p>
                    <span className="profile-title">Name : </span>
                    {user && capitalizeFirstLetter(user?.name)}
                  </p>
                  <p>
                    <span className="profile-title">Phone : </span>
                    {user?.phone}
                  </p>
                  <p>
                    <span className="profile-title">Address : </span>{" "}
                    {user && user.address[0].locality},{" "}
                    {user && capitalizeFirstLetter(user?.address[0].city)},{" "}
                    {user && capitalizeFirstLetter(user?.address[0].state)}
                  </p>
                </div>
                <div className="right">
                  <p>
                    <span className="profile-title">Email : </span>{" "}
                    {user?.email}
                  </p>
                  <p>
                    <span className="profile-title">Total orders : </span>{" "}
                    {user?.orders.length}
                  </p>
                  <p>
                    <span className="profile-title">Created On : </span>{" "}
                    {user?.date.slice(0, 16)}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <div className="btn">
              <Link to="/auth/update" className="nav-link">
                <Button className="modal-btn update-btn">Update profile</Button>
              </Link>
              <Button
                variant="danger"
                className="modal-btn signout-btn"
                onClick={signout}
              >
                Sign out
              </Button>
              <Button
                variant="success"
                className="modal-btn"
                onClick={handleSeller}
              >
                {user?.isSeller ? "My" : "Sell"} products
              </Button>
            </div>
          </Modal>
          {!user && (
            <Link to="/auth/login" className="nav-link">
              <div className="header-option">
                <span className="header-optionline-1">Hello Guest</span>
                <span className="header-optionline-2">Sign In</span>
              </div>
            </Link>
          )}

          <Link to="/orders" className="nav-link">
            <div className="header-option">
              <span className="header-optionline-1">Returns</span>
              <span className="header-optionline-2">& Orders</span>
            </div>
          </Link>
          <a
            href="https://www.primevideo.com/"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            <div className="header-option">
              <span className="header-optionline-1">Your</span>
              <span className="header-optionline-2">Prime</span>
            </div>
          </a>
          <Link to="/checkout" className="nav-link">
            <div className="header-option-basket">
              <Badge badgeContent={basket?.length} color="primary" max={10}>
                <ShoppingCartOutlinedIcon className="header-basket-icon" />
              </Badge>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}
