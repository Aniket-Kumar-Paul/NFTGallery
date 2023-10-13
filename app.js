const express = require("express");
const cors = require("cors");

const nftRouter = require("./Api/Routers/nftRouter");
const userRouter = require("./Api/Routers/userRouter");

// MIDDLEWARE
const app = express();
app.use(express.json({ limit: "100kb" })); // handle json data in incoming requests (ensure json payload < 100kb)
app.use(cors()); // enable ALL CORS requests
app.options("*", cors()); // enable pre-flight CORS requests for ALL routes

// ROUTES
// /api/<version>/<resource>
app.use("/api/v1/nfts", nftRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
