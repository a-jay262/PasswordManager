import React, { useState } from "react";
import axios from "axios";

const LoginSignupPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loginFormVisible, setLoginFormVisible] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginFormVisible) {
        const response = await axios.post(
          "http://localhost:3000/api/logIn",
          loginData
        );
        console.log("User Logged In:", response.data);
        // Handle successful login
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/signUp",
          signupData
        );
        console.log("User Registered:", response.data);
        // Handle successful signup
      }
    } catch (error) {
      console.error("Error in Axios request:", error);
      // Handle error
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Login functionality
    console.log("Logging in with:", loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Signup functionality
    console.log("Signing up with:", signupData);
  };

  return (
    <div
      className="bg-primary d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4">
        <h2 className="text-center mb-4">
          {loginFormVisible ? "Login" : "Sign Up"}
        </h2>
        {loginFormVisible ? (
          <form onSubmit={handleLoginSubmit}>{/* Login form inputs */}</form>
        ) : (
          <form onSubmit={handleSignupSubmit}>{/* Signup form inputs */}</form>
        )}
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ maxWidth: "200px" }}
            onClick={handleSubmit}
          >
            {loginFormVisible ? "Login" : "Sign Up"}
          </button>
        </div>
        <p className="text-center mt-3">
          {loginFormVisible
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            className="btn btn-link"
            onClick={() => setLoginFormVisible(!loginFormVisible)}
          >
            {loginFormVisible ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;
