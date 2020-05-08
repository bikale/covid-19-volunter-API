const fs = require("fs");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user");
const volunteerRoute = require("./routes/volunteer");

const PORT = 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/covidvolunteer/api/v1", userRoute);
app.use("/covidvolunteer/api/v1", volunteerRoute);

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((dbCon) => {
    console.log(`MongoDB Connected ........`);
    app.listen(PORT, () => {
      console.log(
        `Server listening on http://localhost:${PORT}/covidvolunteer/api/v1`
      );
    });
  })
  .catch(console.error);
