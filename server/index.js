const express = require("express");
const app = new express();
require("./DB/Connection");
const router = require("./Routes/route");
const cors = require("cors");
const port = 4000;



app.get("/", (req, res) => {
          res.status(201).json("Server Created...")
});



app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port, () => {
          console.log(`server is running on ${port}`);
})