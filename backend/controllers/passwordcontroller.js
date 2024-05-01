const pass = require("../models/password");
const CryptoJS = require("crypto-js");

async function sendPassword(req, res) {
  try {
    const { email, identity, password } = req.body;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "encryption-secret-key"
    ).toString();
    const newPassword = new pass({
      email: email,
      identity: identity,
      encryptedPassword: encryptedPassword,
    });
    console.log(email);
    console.log("Encrypted", encryptedPassword);
    // Save the password document to MongoDB
    await newPassword.save();

    console.log("Password stored successfully in database");
    res.status(201).json({ message: "Password stored successfully" });
  } catch (error) {
    console.error("Error storing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deletePassword(req, res) {
  try {
    const { email, identity } = req.body;

    console.log("In", email, identity);
    // Delete the password document from MongoDB based on email and identity
    const deletedPassword = await pass.findOneAndDelete({
      email: email,
      identity: identity,
    });

    if (!deletedPassword) {
      console.log("Password not found in the database");
      return res.status(404).json({ message: "Password not found" });
    }

    console.log(
      "Password deleted successfully from the database:",
      deletedPassword
    );
    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    console.error("Error deleting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


const decryptPassword = async (req, res) => {
  try {
    const { identity } = req.params;

    // Find the password document by identity
    const passwordDoc = await pass.findOne({ identity });

    if (!passwordDoc) {
      return res.status(404).json({ message: "Password not found" });
    }

    // Decrypt the password
    const decryptedPassword = CryptoJS.AES.decrypt(
      passwordDoc.encryptedPassword,
      "encryption-secret-key"
    ).toString(CryptoJS.enc.Utf8);

    res.json({ decryptedPassword });
  } catch (error) {
    console.error("Error decrypting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function getAllPasswords() {
  try {
    // Retrieve all password documents from MongoDB
    const allPasswords = await pass.find({});

    if (!allPasswords || allPasswords.length === 0) {
      console.log("No passwords found in the database");
      return []; // Return an empty array if no passwords found
    }

    // Decrypt the encrypted passwords
    const decryptedPasswords = allPasswords.map((passwordDoc) => {
      const bytes = CryptoJS.AES.decrypt(
        passwordDoc.encryptedPassword,
        "encryption-secret-key"
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      console.log(decryptedPassword);
      return {
        identity: passwordDoc.identity,
        decryptedPassword: decryptedPassword,
      };
    });

    return decryptedPasswords;
  } catch (error) {
    console.error("Error retrieving passwords:", error);
    throw new Error("Internal server error");
  }
}

const getAllIdentities = async (req, res) => {
  try {
    const { email } = req.query;

    // Retrieve all password documents from MongoDB filtered by email
    const allPasswords = await pass.find({ email: email });

    if (!allPasswords || allPasswords.length === 0) {
      console.log("No passwords found in the database");
      return res.status(404).json({ message: "No passwords found" });
    }

    // Extract identities from password documents
    const identities = allPasswords.map((passwordDoc) => passwordDoc.identity);

    res.json(identities);
  } catch (error) {
    console.error("Error retrieving passwords:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  sendPassword,
  getAllPasswords,
  getAllIdentities,
  deletePassword,
  decryptPassword,
};
