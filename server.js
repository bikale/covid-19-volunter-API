const fs = require("fs");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const volunteerRoute = require("./routes/volunteer");

//load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/covidvolunteer/api/v1", userRoute);
app.use("/covidvolunteer/api/v1", volunteerRoute);

//404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    data: "Resource Not Found",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((dbCon) => {
    console.log(`MongoDB Connected ........`);
    app.listen(process.env.PORT || PORT, () => {
      console.log(
        `Server listening on http://localhost:${PORT}/covidvolunteer/api/v1`
      );
    });
  })
  .catch(console.error);
