const express = require("express");
const app = express();
const inform = require("./routes/inform");

app.use("inform", inform);
const port = 3001;
app.listen(port, () =>
  console.log(`Node.js Server is running on port ${port}...`)
);
