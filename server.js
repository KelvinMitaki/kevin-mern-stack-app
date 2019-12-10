const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const path = require("path");

//use bodyParser middleware
app.use(bodyParser.json());

//connect to mongoDB
mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log(err));

//setup routes
app.use("/api/items", require("./routes/api/items"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
