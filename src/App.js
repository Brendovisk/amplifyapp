import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsconfig from "../src/aws-exports.js";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import "./App.css";

import Nav from "./components/Nav/Nav.js";
import Home from "./pages/home/Home.js";
import User from "./pages/user/User.js";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
      <div className="btn-signout">
        <AmplifySignOut />
      </div>
    </>
  );
};

export default withAuthenticator(App);