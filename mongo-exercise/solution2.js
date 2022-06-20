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
    tags: { $in: ["frontend", "backend"] },
  })
    .or([{ tags: "frontend" }, { tags: "backend" }])  // Same as above tags filter
    .sort("-price")
    .select("name author price");
};

const run = async () => {
  const courses = await getCourses();

  console.log(courses);
};

run();
