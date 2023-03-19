const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL, {
    useNewUrlParser: true,
  });

  console.log(`MonGoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
