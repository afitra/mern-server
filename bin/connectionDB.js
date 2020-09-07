module.exports = {
  connectDB: (url, cb) => {
    const mongoose = require("mongoose")
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, db) => {
        if (err) {
          console.log("MongoDb connection error.")

          return cb(err, null)
        } else {
          return cb(null, db)
        }
      }
    )
  },
}
