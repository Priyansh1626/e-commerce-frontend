import React, { useEffect } from 'react'
import './sass/main.css';
import Header from './components/Header';
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';
import axios from 'axios';
import { useStateValue } from './components/stateManager/StateProvider';
import UpdateProfile from './components/auth/UpdateProfile';
import SellerPage from './components/SellerPage';
import SellerForm from './components/SellerForm';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
// import axios from './components/axios';  

const promise = loadStripe("pk_test_51M5AaMSDw0brp7tF03b2WS0jDNKWZ6pmPDl7ehiamUW09nWOowZG8zMohrpPKK4VpEzeufB2CuSmhIbfxVpnNMSP00uO5eGGlw");

export default function App() {
  const [{ basket }, dispatch] = useStateValue();

  useEffect(() => {
    const call = async () => {
      const response = await axios.get("http://localhost:8000/isuser", {
        withCredentials: true,
      })
      if (response.data.user) {
        dispatch({
          type: "SET_USER",
          user: response.data.user,
        });
      }
    }
    call();
  }, [])

  return (
    <>
      <Router>
        <Routes >
          <Route exact path="/" element={[<Header key={1} />, <Home key={2} />]} />

          <Route exact path="/checkout" element={[<Header key={1} />, <Checkout key={2} />]} />

          <Route exact path="/checkout/payment" element={[<Header key={1} />, <Elements key={2} stripe={promise}> <Payment /> </Elements>]} />

          <Route exact path="/orders" element={[<Header key={1} />, <Orders key={2} />]} />

          <Route exact path="/auth/login" element={<Signin />} />

          <Route exact path="/auth/update" element={<UpdateProfile />} />

          <Route exact path="/auth/register" element={<Signup />} />

          <Route exact path="/seller/myproducts" element={[<Header key={1} />, <SellerPage key={2} />]} />

          <Route exact path="/sellerform" element={[<Header key={1} />, <SellerForm key={2} />]} />

          <Route exact path="/seller/productform" element={[<Header key={1} />, <ProductForm key={2} />]} />

          <Route exact path="/productdetails" element={[<Header key={1} />, <ProductDetails key={2} />]} />

        </Routes>
      </Router>
    </>
  )
}
