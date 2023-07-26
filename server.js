//https://quiz2-nhicao-csis3380-a177e9ce2034.herokuapp.com/

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config()

const app = express();
const port = 3000;

// Define a Mongoose schema
const QuizSchema = new mongoose.Schema({ name: "string", sid: "string" });

// Compile the schema into a model
const Quiz = mongoose.model("Examrecord", QuizSchema);

// MongoDB connection URI - replace this with your own MongoDB Atlas connection string to test locally
// const url =
//   "mongodb+srv://nhicao268:nhicao268@cluster0.rstjy6k.mongodb.net/Exam?retryWrites=true&w=majority";

//This is the connection string to connect to the database on Heroku
const url = process.env.MONGODB_URI;

console.log(url)

// Connect to MongoDB
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

  app.listen(port, () =>
// app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${port}`)
);

app.get("/", async (req, res) => {
  // Document to be inserted
  const doc = new Quiz({ name: "N C", sid: "300123234-3" });

  // Save the document into the 'quizzes' collection
  try {
    const savedDoc = await doc.save();
    console.log("Document inserted successfully!", savedDoc);
    res.send("Document inserted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to insert document");
  }
});
