const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "React.js Course",
    author: "Bryan",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

// createCourse();

const getCourses = async () => {
  // => Comparison Query Operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in (in)
  // nin (not in)

  // => Logical Query Operators
  // or
  // and

  // => Pagination
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course
    .find({ author: "Mosh", isPublished: true })
    .find({ price: { $gt: 10 } })
    .find({ price: { $in: [10, 15, 20] } })
    .or([{ author: "Mosh" }, { isPublished: true }])
    .find({ author: /^Mosh/ }) // Starts with Mosh
    .find({ author: /pattern$/ }) // Ends with Hamedani
    .find({ author: /.*Mosh.*/ }) // Contains Mosh
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();
  console.log(courses);
};

getCourses();
