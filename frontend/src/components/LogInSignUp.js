import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

const LoginSignupPage = () => {
  const navigate = useNavigate(); // Initialize useHistory

  const [message, setMessage] = useState(null);

  const showMessage = (text) => {
    setMessage(text);
    // Clear message after some time
    setTimeout(() => {
      setMessage(null);
    }, 3000); // Adjust the time as needed
  };


  const handleOTPVerifyClick = () => {
    console.log("Moving on");
    // Redirect to the new page defined in router
    console.log("EMail is: ", loginData.email);
    navigate(`/library?email=${loginData.email}`); // Redirect to the Password Library page with email query parameter
  }; 

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
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpVerificationStatus, setOTPVerificationStatus] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Signup functionality
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signUp",
        signupData
      );
      console.log("User Registered:", response.data);
      showMessage("SignUp successful, LogIn to Continue");
      alert("SignUp successful, LogIn to Continue");

    } catch (error) {
      console.error("Error in Axios request:", error);
      alert("Error in Axios request:", error);
      // Handle error
    }
    console.log("Signing up with:", signupData);
    alert("Signing up with:", signupData);
  };

  const handleSubmitOTP = async (e) => {
    console.log("Before submit");
    e.preventDefault(); // Prevent default form submission behavior
    const isOTPVerified = await verifyOTP(otp);
    console.log("OTP Function");
    if (isOTPVerified) {
      setOTPVerificationStatus("OTP Verified Successfully!");
      console.log("Successfull otp");
      alert("Successfull otp!");
      handleOTPVerifyClick();
      // Proceed with any actions after OTP verification
    } else {
      setOTPVerificationStatus("Invalid OTP");
      // Handle the case where OTP verification fails
    }
  };


  const verifyOTP = async () => {
    console.log("in verify otp");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        { otp: otp } // Send the OTP value directly as "otp"
      );
      console.log(response.data);
      setOTPVerificationStatus(response.data);
      showMessage("LogIn Successfull!");
      alert("LogIn Successfull!");
      setShowOTPForm(false);
      handleOTPVerifyClick();
    } catch (error) {
      console.error("Error in verifying OTP:", error);
      setOTPVerificationStatus("Error verifying OTP");
      alert("Error verifying OTP");

    }
  };





  const sendOTP = (email, otp) => {
    console.log("in the function");
    return axios.post("http://localhost:5000/api/sendEmail", {
      email: email,
      otp: otp,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/logIn", loginData)
      .then((response) => {
        console.log("User Logged In:", response.data);
        alert("Logging In");
        sendOTP(loginData.email, otp)
          .then((otpResponse) => {
            console.log("OTP Sending Status:", otpResponse.data);
            setOTPVerificationStatus(otpResponse.data);
            setShowOTPForm(true);
            showMessage("Verify OTP to Log In"); // Show OTP form after successful login
            alert("Verify OTP to Log In"); // Show OTP form after successful login
          })
          .catch((otpError) => {
            console.error("Error sending OTP:", otpError);
            alert("Error sending OTP:", otpError);
            // Handle error sending OTP
          });
      })
      .catch((error) => {
        console.error("Error in Axios request:", error);
        alert("Error in Axios request:", error);
        // Handle login error
      });
  };

 


  return (
    <div
      className="bg-primary d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4">
        <h2 className="text-center mb-4">
          {loginFormVisible ? "Login" : "Sign Up"}
        </h2>
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        {loginFormVisible ? (
          showOTPForm ? (
            <form onSubmit={handleSubmitOTP}>
              <div className="form-group text-center ">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ maxWidth: "200px" }}
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
              <p className="text-center mt-3">{otpVerificationStatus}</p>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ maxWidth: "200px" }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          )
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Username"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Phone Number"
                name="phoneNumber"
                value={signupData.phoneNumber}
                onChange={handleSignupChange}
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ maxWidth: "200px" }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        )}
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
