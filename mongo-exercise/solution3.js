const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

const getCourses = async () => {
  return await Course.find({
    isPublished: true,
  })
.or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]) // Same as above tags filter
    .select("name author price");
};

const run = async () => {
  const courses = await getCourses();

  console.log(courses);
};

run();
