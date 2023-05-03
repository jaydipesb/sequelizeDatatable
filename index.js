const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routers
const datatableROute = require("./routes/datatableRoutes");


// app.use("/users", router);
app.use("/datatable", datatableROute);

app.get("", (req, res) => {
    res.render("index.ejs");
});

// app.get("/get_data", (req, res) => {
//     console.log("hello");
// });
//port
const PORT = process.env.PORT | 8000;

app.listen(PORT, () => {
    console.log(`server is runnig port ${PORT}`);
});