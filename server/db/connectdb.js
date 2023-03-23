const { default: mongoose } = require("mongoose")

const connectdb = async (url) => {
    await mongoose.connect(url).then(() => console.log("Connected to DB!"));
}

module.exports = connectdb;