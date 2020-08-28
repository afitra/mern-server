const Category = require("../models/Category"),
  Bank = require("../models/Bank"),
  Item = require("../models/Item"),
  Image = require("../models/Image"),
  fs = require("fs-extra"),
  path = require("path")
const e = require("express")
module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard", {
      title: "AMB | Category",
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
        title: "AMB | Category",
      })
    } catch {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
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
    } catch (err) {
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
  viewBank: async (req, res) => {
    try {
      var bank = await Bank.find()
      const alertStatus = req.flash("alertStatus")
      const alertMessage = req.flash("alertMessage")
      const alert = { message: alertMessage, status: alertStatus }

      res.render("admin/bank/view_bank", {
        title: "AMB | Bank",
        bank,
        alert,
      })
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/bank")
    }
  },
  addBank: async (req, res) => {
    try {
      const { name, nameBank, nomorRekening } = req.body

      await Bank.create({
        name,
        nameBank,
        nomorRekening,
        imageUrl: `images/${req.file.filename}`,
      })
      req.flash("alertMessage", "Succes Add Bank")
      req.flash("alertStatus", "success")
      res.redirect("/admin/bank")
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/bank")
    }
  },

  editBank: async (req, res) => {
    const { id, name, nameBank, nomorRekening } = req.body
    const bank = await Bank.findOne({ _id: id })

    try {
      if (req.file == undefined) {
        //
        bank.name = name
        bank.nameBank = nameBank
        bank.nomorRekening = nomorRekening

        await bank.save()
        req.flash("alertMessage", "Succes update Bank")
        req.flash("alertStatus", "success")
        res.redirect("/admin/bank")
      } else {
        await fs.unlink(path.join(`public/${bank.imageUrl}`))
        bank.name = name
        bank.nameBank = nameBank
        bank.nomorRekening = nomorRekening
        bank.imageUrl = `images/${req.file.filename}`
        await bank.save()
        req.flash("alertMessage", "Succes update Bank")
        req.flash("alertStatus", "success")
        res.redirect("/admin/bank")
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/bank")
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.params
      const bank = await Bank.findOne({ _id: id })
      await fs.unlink(path.join(`public/${bank.imageUrl}`))
      await bank.remove()
      req.flash("alertMessage", "Succes delete Bank")
      req.flash("alertStatus", "success")
      res.redirect("/admin/bank")
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/bank")
    }
    //
  },

  viewItem: async (req, res) => {
    try {
      const item = await Item.find()
        .populate({
          path: "imageId",
          select: " id imageUrl",
        })
        .populate({
          path: "categoryId",
          select: " id name",
        })

      const category = await Category.find()
      const alertStatus = req.flash("alertStatus")
      const alertMessage = req.flash("alertMessage")
      const alert = { message: alertMessage, status: alertStatus }
      res.render("admin/item/view_item", {
        title: "AMB | Item",
        category,
        alert,
        item,
        action: "view",
      })
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/item")
    }
  },

  addItem: async (req, res) => {
    //

    try {
      const { categoryId, title, price, city, about } = req.body
      if (req.files.length > 0) {
        const category = await Category.findOne({ _id: categoryId })

        const newItem = {
          categoryId: category._id,
          title,
          description: about,
          price,
          city,
        }
        const item = await Item.create(newItem)
        category.itemId.push({
          _id: item.id,
        })
        await category.save()
        for (let i = 0; i < req.files.length; i++) {
          // const element = req.files[i]
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          })

          item.imageId.push({
            _id: imageSave._id,
          })
          await item.save()
        }

        req.flash("alertMessage", "Succes add Item")
        req.flash("alertStatus", "success")
        res.redirect("/admin/item")
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/bank")
    }
  },

  showImageItem: async (req, res) => {
    try {
      const id = req.params.id,
        item = await Item.findOne({
          _id: id,
        }).populate({
          path: "imageId",
          select: " id imageUrl",
        })

      const category = await Category.find()
      const alertStatus = req.flash("alertStatus")
      const alertMessage = req.flash("alertMessage")
      const alert = { message: alertMessage, status: alertStatus }
      res.render("admin/item/view_item", {
        title: "AMB | Item",
        category,
        alert,
        item,
        action: "show image",
      })
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/item")
    }
  },
  showEditItem: async (req, res) => {
    try {
      const id = req.params.id,
        item = await Item.findOne({
          _id: id,
        })
          .populate({
            path: "imageId",
            select: " id imageUrl",
          })
          .populate({ path: "categoryId", select: "id name" })

      const category = await Category.find()
      const alertStatus = req.flash("alertStatus")
      const alertMessage = req.flash("alertMessage")
      const alert = { message: alertMessage, status: alertStatus }

      res.render("admin/item/view_item", {
        title: "AMB | Item",
        category,
        alert,
        item,
        action: "edit",
      })
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/item")
    }
  },

  editItem: async (req, res) => {
    try {
      const { id } = req.params,
        { categoryId, title, price, city, about } = req.body,
        item = await Item.findOne({ _id: id })
          .populate({ path: "imageId", select: "id imegeUrl" })
          .populate({ path: "categoryId", select: "id name" })
      console.log(item)
      if (req.files.length > 0) {
        for (let i = 0; i < item.imageId.length; i++) {
          var el = item.imageId[i]._id
          console.log(">>>>>>", el)
          imageUpdate = await Image.findOne({ _id: el })
          console.log("<<<<<", imageUpdate)
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`))
          imageUpdate.imageUrl = `images/${req.files[i].filename}`
          await imageUpdate.save()
        }

        item.title = title
        item.price = price
        item.city = city
        item.description = about
        item.categoryId = categoryId
        await item.save()
        req.flash("alertMessage", "Succes update Item")
        req.flash("alertStatus", "success")
        res.redirect("/admin/item")
      } else {
        item.title = title
        item.price = price
        item.city = city
        item.description = about
        item.categoryId = categoryId
        await item.save()
        req.flash("alertMessage", "Succes update Item")
        req.flash("alertStatus", "success")
        res.redirect("/admin/item")
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect("/admin/item")
    }
  },

  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking", {
      title: "AMB | Booking",
    })
  },
}
