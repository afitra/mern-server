const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGO_SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const fruitSchema = new mongoose.Schema({
  nama: String,
  rating: Number,
  review: String,
})
const Fruit = mongoose.model("Fruit", fruitSchema)
const apple = new Fruit({
  nama: "apple",
  rating: 5,
  review: "bagus",
})

apple.save((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("berhasil dong")
  }
})
