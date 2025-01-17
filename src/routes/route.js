const express = require("express");
const route = express.Router();

const isRegister = require("../auth/register");
const isLogin = require("../auth/login");

//Karyawan
const ListKaryawan = require("../controller/karyawan/01_ListKaryawan");
const DetailKaryawan = require("../controller/karyawan/05_DetailKaryawan");
const AddKaryawan = require("../controller/karyawan/02_AddKaryawan");
const DeleteKaryawan = require("../controller/karyawan/03_SoftDeleteKaryawan");
const UpdateKaryawan = require("../controller/karyawan/04_UpdateKaryawan");

//Gaji
const AddGaji = require("../controller/gajian/01_AddGaji");
const ListKaryawanGajiID = require("../controller/gajian/02_ListGajiMaster");
const EditGajiDetail = require("../controller/gajian/03_EditGaji");
const GetGajiDetails = require("../controller/gajian/04_GajiMasterDetails");
const AddGajimaster = require("../controller/gajian/06_AddGajiMaster");

//calculate
const JustCalculate = require("../controller/gajian/05_CalculateGaji");

//Parameter endpoints
route.get("/karyawan/:id", DetailKaryawan);
route.get("/karyawan", ListKaryawan);
route.post("/karyawan", AddKaryawan);
route.put("/karyawan/:id", UpdateKaryawan);
route.delete("/karyawan/:id", DeleteKaryawan);

//Gaji Endpoints
route.post("/gaji/:id", AddGaji);
route.get("/gaji/:id", ListKaryawanGajiID);
route.get("/gaji/:IGM/details/:KID", GetGajiDetails);
route.post("/gajiadd", AddGajimaster);

//calculate endpoints
route.post("/calculate/:id", JustCalculate);

//Auth
route.post("/register", isRegister);
route.post("/login", isLogin);

//export routing
module.exports = route;
