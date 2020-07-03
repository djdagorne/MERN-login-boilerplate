const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// set up middleware
// express json parser
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || "5000";

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});

// at this point we set up a cluster/db on mongodb atlas we
// make project, cluster, whitelist your IP if running locally...
// connect to cluster, find connection string

// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (error) => {
    if (error) {
      throw error;
    }
    console.log("MongoDB connection established.");
  }
);

//set up routes

app.use("/users", require("./routes/userRouter"));

app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: `API endpoint doesn't exist`,
  });
});
