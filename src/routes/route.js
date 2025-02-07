const express = require("express");
const route = express.Router();

const isRegister = require("../auth/register");
const isLogin = require("../auth/login");
const VerifLogin = require("../auth/veriflogin.js");
const refreshToken = require("../auth/refresh_token.js");

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
const AddNewKategory = require("../controller/kategori_gaji/02_Add_Kategory.js");
const EditKategory = require("../controller/kategori_gaji/03_Edit_Kategory.js");
const DeleteKategory = require("../controller/kategori_gaji/04_DeleteKategory.js");

//calculate
const JustCalculate = require("../controller/gajian_detail/00_CalculateGaji");

//Parameter endpoints
route.get("/karyawan/:id", VerifLogin, DetailKaryawan);
route.get("/karyawan", VerifLogin, ListKaryawan);
route.post("/karyawan", VerifLogin, AddKaryawan);
route.put("/karyawan/:id", VerifLogin, UpdateKaryawan);
route.delete("/karyawan/:id", VerifLogin, DeleteKaryawan);

//Gaji Master
route.post("/master/gaji/add", VerifLogin, AddGajimaster);
route.get("/master/gaji", VerifLogin, ListGajiMaster);
route.put("/master/gaji/delete/:id", VerifLogin, DeleteGajiMaster);

//Gaji Endpoints
route.post("/gaji/:id", VerifLogin, AddDataGajiHarian);
route.get("/gaji/:id", VerifLogin, ListGajiKaryawan);
route.delete("/gaji/delete/:IGM/:KID", VerifLogin, DeleteHarianKaryawan);
// route.get("/gaji/:IGM/details/:KID", GetGajiDetails);

//calculate endpoints
route.post("/calculate/:id", VerifLogin, JustCalculate);

//Kategory Gaji
route.get("/kategori/list", VerifLogin, GetAllKategory);
route.post("/kategori/add", VerifLogin, AddNewKategory);
route.put("/kategori/edit/:id", VerifLogin, EditKategory);
route.delete("/kategori/delete/:id", VerifLogin, DeleteKategory);

//Auth
route.post("/register", VerifLogin, isRegister);
route.post("/login", isLogin);
route.get("/refreshtoken", refreshToken);

//export routing
module.exports = route;
