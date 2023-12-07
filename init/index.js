const mongoose = require("mongoose");
const initDataModule = require("./data.js"); // Renamed the module variable
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/bulk";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  let modifiedData = initDataModule.data.map((obj) => ({ ...obj, owner: "65619620595f72c2a3882a5b" }));
  await Listing.insertMany(modifiedData); // Renamed the variable
  console.log("Data was initialized");
};

initDB();
