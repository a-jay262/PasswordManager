const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/passwordmanager");

    console.log(`DB is connected with ${mongoose.connection.host}`);
  } catch (error) {
    await mongoose.disconnect();
    process.exit(1);
  }
};

module.exports = { ConnectDB }; // Export ConnectDB as a named export
