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
const apples = new Fruit({
  nama: "apples",
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

function ok() {
  var result = []

  for (let i = 0; i < 10; i++) {
    result.push(
      new Fruit({
        nama: `temp${i}`,
        rating: i,
        review: "bagus",
      })
    )
  }
  return result
}

Fruit.insertMany(ok(), (err) => {
  if (err) {
    console.log("gagal borongan", err)
  } else {
    console.log("sukses borongan")
    mongoose.connection.close()
  }
})
