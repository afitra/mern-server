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

// Fruit.find()
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

module.exports = {
  read: () => {
    console.log("masokkkk")
    return Fruit.find((err, fruit) => {
      if (err) {
        console.log(err)
      } else {
        console.log(fruit)
        return fruit
      }
    })
  },
}

read()
