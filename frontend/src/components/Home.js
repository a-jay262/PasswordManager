import React from "react";
import logo from "./logo5.png";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

const Home = () => {
  const navigate = useNavigate(); // Initialize useHistory

  const handleClick = () => {
    // Redirect to the new page defined in router
    navigate("/loginsignup"); // Redirect to the Password Library page
  };
  const handleClick2 = () => {
    // Redirect to the new page defined in router
    navigate("/generator"); // Redirect to the Password Generator page
  };
  const handleClick3 = () => {
    // Redirect to the new page defined in router
    navigate("/customize"); // Redirect to the Password Generator page
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        backgroundColor: "hsl(215, 100%, 35%)", // Adjusted lightness value for a darker shade
        minHeight: "100vh",
        padding: "0 20px",
      }}
    >
      <img
        src={logo}
        alt="logo"
        className="img-fluid"
        style={{ maxWidth: "400px", marginTop: "50px" }}
      />
      <br></br>
      <h1 className="text-center text-light mt-5 mb-5">
        Password Generator & Manager
      </h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4" onClick={handleClick2}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h5 className="card-title mb-3">Generate Password</h5>
              <p className="card-text text-center">
                Provide the length and preferences of your password and generate
                and copy the password. You can also save it in your library.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" onClick={handleClick3}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h5 className="card-title mb-3">Customize Password</h5>
              <p className="card-text text-center">
                Customize passwords to personal preferences. The strength of the
                password is shown to ensure it is secure. It can be saved to the
                library.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" onClick={handleClick}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h5 className="card-title mb-3">Password Library</h5>
              <p className="card-text text-center">
                View or delete all passwords previously saved by the password
                management app. Authentication is required to limit access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
