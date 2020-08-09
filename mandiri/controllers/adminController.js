const Category = require("../models/Category")
module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard", {
      title: "AMB|Category",
    })
  },
  viewCategory: async (req, res) => {
    try {
      let category = await Category.find()
      const alertStatus = req.flash("alertStatus")
      const alertMessage = req.flash("alertMessage")
      const alert = { message: alertMessage, status: alertStatus }
      res.render("admin/category/view_category", {
        category,
        alert,
        title: "AMB|Category",
      })
    } catch {
      res.redirect("/admin/category")
    }
  },
  addCategory: (req, res) => {
    const { name } = req.body

    return Category.create({ name }, (err, data) => {
      if (err) {
        req.flash("alertMessage", `${err.message}`)
        req.flash("alertStatus", "danger")
        res.redirect("/admin/category")
      } else {
        req.flash("alertMessage", "Succes Add Category")
        req.flash("alertStatus", "success")
        res.redirect("/admin/category")
      }
    })
  },
  editCategory: async (req, res) => {
    try {
      let { id, name } = req.body
      const data = await Category.findOne({ _id: id })
      data.name = name
      data.save()
      req.flash("alertMessage", "Succes Update Category")
      req.flash("alertStatus", "success")
      res.redirect("/admin/category")
    } catch {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/category")
    }
  },
  deleteCategory: (req, res) => {
    const { id } = req.params
    Category.findByIdAndDelete({ _id: id })
      .then((data) => {
        req.flash("alertMessage", "Succes Delete Category")
        req.flash("alertStatus", "success")
        res.redirect("/admin/category")
      })
      .catch((err) => {
        req.flash("alertMessage", `${err.message}`)
        req.flash("alertStatus", "danger")
        res.redirect("/admin/category")
      })
  },
  viewBank: (req, res) => {
    res.render("admin/bank/view_bank", {
      title: "AMB|Bank",
    })
  },
  viewItem: (req, res) => {
    res.render("admin/item/view_item", {
      title: "AMB|Item",
    })
  },
  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking", {
      title: "AMB|Booking",
    })
  },
}
