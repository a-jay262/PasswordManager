import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; 

const PasswordLibrary = () => {

  const location = useLocation(); // Initialize useLocation hook
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [passwords, setPasswords] = useState([]);

   const [identity, setIdentity] = useState("");
   const [password, setPassword] = useState("");

   const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility

   const savePassword = () => {
     // Functionality to save password
     console.log("Show Dialog!");
     setShowDialog(true); // Show dialog after saving password
   };

   const handleCloseDialog = () => {
     setShowDialog(false); // Close dialog
   };

   const handleSaveClick = async () => {
     try {
       const response = await fetch("http://localhost:5000/api/passwords", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, identity, password }),
       });
       const data = await response.json();
       console.log(data);
       // Reset the form after successful submission
       setIdentity("");
       setPassword("");
       console.log("Identity and password saved!");
       alert("saved!");
       handleCloseDialog();
       window.location.reload();
     } catch (error) {
       console.error("Error:", error);
       alert("error!");
     }
     // Functionality to save identity and password
   };

  useEffect(() => {
    fetchPasswords();
  }, []);

   const handleCopyPassword = async (identity) => {
    try {
    const response = await axios.get(`http://localhost:5000/api/decryptpassword/${identity}`);
    const { decryptedPassword } = response.data;
    navigator.clipboard.writeText(decryptedPassword);
    alert("Password copied to clipboard!");
  } catch (error) {
    console.error("Error copying password:", error);
    // Handle error
  }
   };

   const handleDeletePassword = async (identity) => {
     try {
       const response = await axios.delete(
         "http://localhost:5000/api/delete",
         {
           data: { email: email, identity: identity }, // Replace userEmail with the actual email
         }
       );

       console.log(response.data); // Log the response data
       alert(`Password with identity ${identity} deleted successfully`);
       // After deleting the password, you may want to fetch the passwords again to update the list
       fetchPasswords();
     } catch (error) {
       console.error("Error deleting password:", error);
       alert("Error deleting password");
     }
   };

const fetchPasswords = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/getallpasswords",
      {
        params: { email: email }, // Send email as a query parameter
      }
    );
    const data = response.data;
    console.log("Data received:", data);
    setPasswords(data);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    // Handle error state
  }
};


  return (
    <div
      className="bg-primary d-flex flex-column "
      style={{ minHeight: "100vh", padding: "100px" }}
    >
      <br />
      <h1 className="text-white text-center mb-4">Password Library</h1>
      <ul className="list-group">
        {passwords.map((identity, index) => (
          <li
            key={index}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <span>{identity}</span>
            <div>
              <button
                className="btn btn-sm btn-outline-dark mx-2"
                onClick={() => handleCopyPassword(identity)}
              >
                <i className="fas fa-copy"></i> Copy
              </button>
              <button
                className="btn btn-sm btn-outline-dark mx-2"
                onClick={() => handleDeletePassword(identity)}
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={savePassword}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          backgroundColor: "white",
          color: "hsl(215, 100%, 35%)",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        Save Password
      </button>

      {showDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <h3>Identity</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter identity"
              onChange={(e) => setIdentity(e.target.value)}
            />
            <h3>Password</h3>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-between">
              <button
                onClick={handleSaveClick}
                className="btn btn-primary mr-2"
              >
                Save
              </button>

              <button onClick={handleCloseDialog} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordLibrary;
