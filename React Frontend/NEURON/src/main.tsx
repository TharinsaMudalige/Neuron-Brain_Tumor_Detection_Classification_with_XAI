import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PresentationPage from "./presentationPage";
import "./presentationStyles.css"; 
import SignUpPage from "./signUp";
import SignInPage from "./signIn";
import HomePage from "./homePage";
import InputPage from "./inputPage";
import ResultPage from "./resultPage";
import AboutUsPage from "./aboutUs";
import ContactPage from "./contact";
import AccountPage from "./account";
import HelpPage from "./help";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PresentationPage />} /> 
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/inputPage" element={<InputPage />} />
        <Route path="/resultPage" element={<ResultPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
