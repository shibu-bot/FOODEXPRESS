const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://shibu:shibu@cluster0.eif5p.mongodb.net/foodExpress?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
const connect = async () => {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true }, async (err) => {
    if (err) console.log("---", err);
    else {
      console.log("DB CONNECTED");
      const dataObj = await mongoose.connection.db.collection("foodData2");
      dataObj.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "foodCategory"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};

module.exports = connect;
