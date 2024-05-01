import React, { useState } from "react";

const CustomizePassword = () => {
  const [password, setPassword] = useState("");

  // Function to calculate password strength
  const getPasswordStrength = (password) => {
    // You can implement your own password strength algorithm here
    // For simplicity, let's assume password strength based on length
    if (password.length >= 8) {
      return "Strong";
    } else if (password.length >= 6) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  // Function to get progress bar color based on strength
  const getProgressBarColor = (strength) => {
    switch (strength) {
      case "Strong":
        return "green";
      case "Medium":
        return "orange";
      case "Weak":
        return "red";
      default:
        return "transparent";
    }
  };

  // Function to get progress bar width based on strength
  const getProgressBarWidth = (strength) => {
    switch (strength) {
      case "Strong":
        return "100%";
      case "Medium":
        return "60%";
      case "Weak":
        return "30%";
      default:
        return "0%";
    }
  };

  return (
    <div
      style={{
        backgroundColor: "hsl(215, 100%, 35%)",
        minHeight: "100vh",
        padding: "0 20px",
        position: "relative", // Position relative to contain the button
      }}
    >
      <h1>Customize Password</h1>
      <p>Enter password to check strength...</p>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: "20px", padding: "10px", width: "100%" }}
      />
      <div style={{ marginTop: "10px" }}>
        <strong>Password Strength:</strong>{" "}
        <span
          style={{ color: getProgressBarColor(getPasswordStrength(password)) }}
        >
          {getPasswordStrength(password)}
        </span>
        <div
          style={{
            height: "10px",
            backgroundColor: "lightgrey",
            borderRadius: "5px",
            marginTop: "5px",
          }}
        >
          <div
            style={{
              width: getProgressBarWidth(getPasswordStrength(password)),
              height: "100%",
              backgroundColor: getProgressBarColor(
                getPasswordStrength(password)
              ),
              borderRadius: "5px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePassword;
