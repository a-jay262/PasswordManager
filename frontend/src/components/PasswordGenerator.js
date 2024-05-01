import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./PasswordGenerator.css";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./characters";

import { COPY_SUCCESS } from "./Message";


const PasswordGenerator = () => {

  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = () => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("You must select at least one option", true);
      return;
    }

    let characterList = "";
    if (includeLowercase) characterList += lowerCaseLetters;
    if (includeUppercase) characterList += upperCaseLetters;
    if (includeNumbers) characterList += numbers;
    if (includeSymbols) characterList += specialCharacters;

    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
    setPassword("");
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = () => {
    if (password === "") {
      notify("Nothing to copy", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
    }
  };

  const handleSavePassword = () => {
    console.log("Password saved!");
    setShowDialog(true);
  };

  const savePassword = () => {
    // Functionality to save password
    console.log("Password saved!");
    setShowDialog(true); // Show dialog after saving password
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Close dialog
  }

  return (
    <div className="App">
      <br></br>
      <br></br>
      <div className="headcontainer">
        <h2 className="generator__header">Password Generator</h2>
      </div>

      <div className="container">
        <div className="generator">
          <div className="generator__password"> 
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy__btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password Length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="10"
              min="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="uppercase-letters">Enter Upper Case Letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lowercase-letters">Enter Lower Case Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-numbers">Enter Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-symbols">Enter Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>

          <button onClick={handleGeneratePassword} className="generator__btn">
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
