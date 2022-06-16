// Creating settled Promises

// const resolve = Promise.resolve({ id: 1 });
// resolve.then((result) => console.log(result));

// const reject = Promise.reject(new Error("reason for rejection..."));
// reject.catch((error) => console.log(error));

// Parallel Promises
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
    // reject(new Error("Failed for some reason"));
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
