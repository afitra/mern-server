const mongoose = require("mongoose")
// var pull = require("./read_data.js")
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
Fruit.updateOne(
  {
    _id: "5f119cbeb53c7f4afcc5b9f9",
  },
  {
    nama: "buku",
  },
  (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log("okokokok ")
    }
  }
)

Fruit.deleteOne(
  {
    _id: "5f2e55fd410be11fa335078e",
  },

  (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log("okokokok ")
    }
  }
)

Fruit.deleteMany(
  {
    _id: [
      "5f2e55fd410be11fa3350788",
      "5f2e55fd410be11fa3350787",
      "5f2e55fd410be11fa3350786",
      "5f2e55fd410be11fa3350785",
      "5f2e5526dc4f921eda1f3ee6",
    ],
  },

  (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log("okokokok ")
    }
  }
)

Fruit.find((err, fruit) => {
  if (err) {
    console.log(err)
  } else {
    console.log(fruit)
    return fruit
  }
})
