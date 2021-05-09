const mongoose = require("mongoose");
const connectionStr = process.env.CONNECTION_STR;

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("mongoose error!!!!");
    console.log(err);
  });

mongoose.connection.on("error", (err) => {
  console.log("this is a mongoose error");
});
