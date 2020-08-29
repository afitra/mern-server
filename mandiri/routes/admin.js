const { route } = require(".")

const router = require("express").Router()
const adminController = require("../controllers/adminController")
const { uploadMultiple, uploadSingle } = require("../middlewares/multer")
//// =======   END POINT CATEGORY
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

//  =======  end point booking
router.get("/booking", adminController.viewBooking)

module.exports = router
