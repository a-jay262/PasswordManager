// express mongoose morgan http-status dotenv
const dotenv =  require("dotenv");
dotenv.config();
const app = require("./app.js");
const { ConnectDB } = require( "./config/db.config.js");
const port = process.env.PORT || 8000

//db connection
ConnectDB();


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
