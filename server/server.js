const express = require("express");
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
app.use(cors());
const usersRoutes = require("./routes/usersRoutes");
const inventoryRoute = require("./routes/inventoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");



app.use("/api/users", usersRoutes);
app.use("/api/inventory", inventoryRoute);
app.use('/api/dashboard',dashboardRoute);
app.listen(port, () => console.log(`Node JS Server Started at  ${port}`));









