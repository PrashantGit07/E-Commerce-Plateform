
import React from "react";
import Layout from "./Components/Layout/Layout.js";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.js";
import { About } from "./Pages/About.js";
import Contact from "./Pages/Contact.js";
import { Policy } from "./Pages/Policy.js";
import { PageNotFound } from "./Pages/PageNotFound.js";
import Register from "./Pages/Auth/Register.js";
import Login from "./Pages/Auth/Login.js";
import Dashboard from "./Pages/user/Dashboard.js";
import PrivateRoute from "./Components/Routes/PrivateRoute.js";
import { ForgotPassword } from "./Pages/ForgotPassword.js";
import AdminRoute from "./Components/Routes/AdminRoute.js";
import AdminDashboard from "./Pages/Admin/AdminDashboard.js";
import CreateCategory from "./Pages/Admin/CreateCategory.js";
import CreateProduct from "./Pages/Admin/CreateProduct.js";
import UsersDetails from "./Pages/Admin/UsersDetails.js";
import UserProfile from "./Pages/user/UserProfile.js";
import UserOrders from "./Pages/user/UserOrders.js";
import Products from "./Pages/Admin/Products.js";
import UpdateProduct from "./Pages/Admin/UpdateProduct.js";
import ProductDetails from "./Pages/ProductDetails.js";
// import Categories from "./Pages/Categories.js";
import CategoryProduct from "./Pages/CategoryProduct.js";
import CartDetails from "./Pages/CartDetails.js";
import Checkout from "./Pages/Checkout.js";
import UpdateProfile from "./Pages/user/UpdateProfile.js";
import CancelOrder from "./Pages/user/CancelOrder.js";



function App() {
  return (
    <>


      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/categories" element={<Categories />} /> */}
          <Route path="/caetgory-product/:slug" element={<CategoryProduct />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productDetails/:slug" element={<ProductDetails />} />


          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
            <Route path="user/cart" element={<CartDetails />} />
            <Route path="user/checkout" element={<Checkout />} />
            <Route path="user/update-profile" element={<UpdateProfile />} ></Route>
            <Route path="user/cancel-order" element={<CancelOrder />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/users" element={<UsersDetails />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          </Route>
        </Routes>
      </Layout>

    </>
  );
}

export default App


