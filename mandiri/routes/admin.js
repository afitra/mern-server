const { route } = require(".")

const router = require("express").Router()
const adminController = require("../controllers/adminController")

//// =======   END POINT CATEGORY
router.get("/dashboard", adminController.viewDashboard)
router.get("/category", adminController.viewCategory)
router.post("/category", adminController.addCategory)
router.put("/category", adminController.editCategory)
router.delete("/category/:id", adminController.deleteCategory)

// =======  end point bank
router.get("/bank", adminController.viewBank)
router.get("/item", adminController.viewItem)
router.get("/booking", adminController.viewBooking)

module.exports = router
