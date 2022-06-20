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

  const courses = await Course.find({ author: "Mosh", isPublished: true })
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

const updateCourse = async (id) => {
  console.log(`Updating id:${id}`);

  // Approach: Query first
  // findById()
  // Modify its properties
  // save()
  // const course = await Course.findById(id);
  // if (!course) return;

  // course.isPublished = true;
  // course.author = 'Another Author';

  // // Also possible to do this
  // // course.set({
  // //   isPublished: true,
  // //   author: 'Another Author'
  // // });

  // const result = await course.save();
  // console.log(result);

  // Another Approach: Updat first
  // Update directly
  // Optionally get the updated document
  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: "Jason",
        isPublished: false,
      },
    },
    { new: true }
  );

  console.log(course);
};

updateCourse("5a68fdc3615eda645bc6bdec");

const removeCourse = async (id) => {
  // const result = await Course.deleteMany({ _id: id });
  const course = await Course.findByIdAndRemove(id);

  console.log(course);
};

removeCourse("5a68fdc3615eda645bc6bdec");
