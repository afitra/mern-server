const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGO_SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const fruitSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "kasih nama dungs"],
  },
  rating: {
    type: Number,
    min: 1,
    max: [5, " 1 - 5 om "],
  },
  review: String,
})
const Fruit = mongoose.model("Fruit", fruitSchema)
const apple = new Fruit({
  nama: "apple",
  rating: 5,
  review: "bagus",
})
const apples = new Fruit({
  nama: "apples",
  rating: 10,
  review: "bagus",
})

apples.save((err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log("berhasil dong")
  }
})

apple.save((err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log("berhasil dong")
  }
})
