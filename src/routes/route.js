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

//Gaji Master
const AddGajimaster = require("../controller/gaji_master/01_AddGaji_Master");
const ListGajiMaster = require("../controller/gaji_master/02_ListGaji_Master");
const DeleteGajiMaster = require("../controller/gaji_master/03_DeleteGaji_Master");

//Gaji
const AddDataGajiHarian = require("../controller/gajian_detail/01_AddGaji_Karyawan");
const ListGajiKaryawan = require("../controller/gajian_detail/02_ListGaji_Karyawan.js");
const EditDataHarian = require("../controller/gajian_detail/03_Edit_DataHarian_Karyawan");
const GetDataHarian = require("../controller/gajian_detail/04_View_DataHarian_Karyawan");
const DeleteHarianKaryawan = require("../controller/gajian_detail/05_Delete_DataHarian_Karyawan");

//Kategori master
const GetAllKategory = require("../controller/kategori_gaji/01_ListAllKategory.js");

//calculate
const JustCalculate = require("../controller/gajian_detail/00_CalculateGaji");

//Parameter endpoints
route.get("/karyawan/:id", DetailKaryawan);
route.get("/karyawan", ListKaryawan);
route.post("/karyawan", AddKaryawan);
route.put("/karyawan/:id", UpdateKaryawan);
route.delete("/karyawan/:id", DeleteKaryawan);

//Gaji Master
route.post("/master/gaji/add", AddGajimaster);
route.get("/master/gaji", ListGajiMaster);
route.put("/master/gaji/delete/:id", DeleteGajiMaster);

//Gaji Endpoints
route.post("/gaji/:id", AddDataGajiHarian);
route.get("/gaji/:id", ListGajiKaryawan);
route.delete("/gaji/delete/:IGM/:KID", DeleteHarianKaryawan);
// route.get("/gaji/:IGM/details/:KID", GetGajiDetails);

//calculate endpoints
route.post("/calculate/:id", JustCalculate);

//Kategory Gaji
route.get("/kategori/list", GetAllKategory);

//Auth
route.post("/register", isRegister);
route.post("/login", isLogin);

//export routing
module.exports = route;
