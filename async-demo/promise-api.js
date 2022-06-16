// Creating settled Promises

const resolve = Promise.resolve({ id: 1});
resolve.then(result => console.log(result));

const reject = Promise.reject(new Error('reason for rejection...'));
reject.catch(error => console.log(error));
