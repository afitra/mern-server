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
  review: {
    type: String,
    enum: ["bagus", "jelek", ""],
    required: () => {
      console.log(">>>", this.rating, "<<<", this.fruitSchema)
      console.log(this.rating < 3)
      return this.rating > 3
    },
  },
})
const Fruit = mongoose.model("Fruit", fruitSchema)
const apple = new Fruit({
  nama: "apple",
  rating: 5,
  review: "bagus",
})
const apples = new Fruit({
  nama: "apples",
  rating: 5,
  review: "",
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
