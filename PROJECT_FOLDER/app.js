// app.js

const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const config = require("./config/config.json"); // impor file konfigurasi

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inisialisasi Sequelize dengan konfigurasi
const sequelize = new Sequelize(config.development);

// Coba koneksi ke basis data
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Setelah ini, Anda dapat memuat model dan menggunakan Sequelize di aplikasi Anda

const apiRoutes = require("./routes/index");
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
