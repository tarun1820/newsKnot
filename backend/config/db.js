const mongoose = require('mongoose');

const mongoDbUrl = 'mongodb://127.0.0.1:27017/testdb';
// const mongoDbUrl="mongodb+srv://tarun1820:$Tarun%401820@cluster0.aksnxov.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

const connectDB = async () => {
  const conn = await mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
  });

  console.log(`MonGoDB Connected`);
};

module.exports = connectDB;
