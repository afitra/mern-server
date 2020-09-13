const { route } = require(".")

const router = require("express").Router()
const adminController = require("../controllers/adminController")
const { uploadMultiple, uploadSingle } = require("../middlewares/multer")
const auth = require("../middlewares/auth")
//// =======   END POINT CATEGORY

router.get("/", function (req, res, next) {
  res.redirect("/admin/signin")
}) // ======= hapus jika ingin halaman admin asli
router.get("/signin", adminController.viewSignIn)
router.post("/signin", adminController.actionSignIn)
router.use(auth)
router.get("/logout", adminController.actionLogout)
router.get("/dashboard", adminController.viewDashboard)
router.get("/category", adminController.viewCategory)
router.post("/category", adminController.addCategory)
router.put("/category", adminController.editCategory)
router.delete("/category/:id", adminController.deleteCategory)

// =======  end point bank
router.get("/bank", adminController.viewBank)
router.post("/bank", uploadSingle, adminController.addBank)
router.put("/bank", uploadSingle, adminController.editBank)
router.delete("/bank/:id", adminController.deleteBank)

//  =======  end point item
router.get("/item", adminController.viewItem)
router.post("/item", uploadMultiple, adminController.addItem)
router.get("/item/show-image/:id", adminController.showImageItem)
router.get("/item/:id", adminController.showEditItem)
router.put("/item/:id", uploadMultiple, adminController.editItem)
router.delete("/item/:id/delete", adminController.deleteItem)

//  =======  end point detail item
router.get("/item/show-detail-item/:itemId", adminController.viewDetailItem)
router.post("/item/add/feature", uploadSingle, adminController.addFeature)
router.put("/item/update/feature", uploadSingle, adminController.editFeature)
router.delete(
  "/item/:itemId/feature/:id",
  uploadSingle,
  adminController.deleteFeature
)

//  =======  end point activity
router.post("/item/add/activity", uploadSingle, adminController.addActivity)
router.put("/item/update/activity", uploadSingle, adminController.editActivity)
router.delete("/item/:itemId/activity/:id", adminController.deleteActivity)

//  =======  end point Booking
router.get("/booking", adminController.viewBooking)
router.get("/booking/:id", adminController.showDetailBooking)
router.put("/booking/:id/confirmation", adminController.actionConfirmation)
router.put("/booking/:id/reject", adminController.actionReject)

// ============ all route
router.get("*", function (req, res, next) {
  res.redirect("/admin/signin")
}) // ======= hapus jika ingin halaman admin asli

module.exports = router