const express = require("express");
const route = express.Router();

const isRegister = require("../auth/register");
const isLogin = require("../auth/login");

const ListKaryawan = require("../controller/karyawan/01_ListKaryawan");
const DetailKaryawan = require("../controller/karyawan/05_DetailKaryawan");
const AddKaryawan = require("../controller/karyawan/02_AddKaryawan");
const DeleteKaryawan = require("../controller/karyawan/03_SoftDeleteKaryawan");
const UpdateKaryawan = require("../controller/karyawan/04_UpdateKaryawan");

//Parameter endpoints
route.get("/karyawan/:id", DetailKaryawan);
route.get("/karyawan", ListKaryawan);
route.post("/karyawan", AddKaryawan);
route.put("/karyawan/:id", UpdateKaryawan);
route.delete("/karyawan/:id", DeleteKaryawan);

route.post("/register", isRegister);
route.post("/login", isLogin);

//export routing
module.exports = route;
