const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config({ path: "./config.env" });

const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev }); // initialize next.js server instance
const handle = nextServer.getRequestHandler(); // sets up request handler for the next.js server

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, // removes deprecation warning
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

let server;
nextServer.prepare().then(() => {
  // waits for the next.js server to prepare itself
  // ssets up express route that catches all requests and passes them to the next.js request handler
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  // Start the express server listening on the port
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
});
