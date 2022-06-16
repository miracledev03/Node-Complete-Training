console.log("Before");

// Callbacks

getUser(1, getRepositories);

console.log("After");

function getRepositories(user) {
  console.log("User", user);

  // Get the repositories
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  console.log("Repos", repos);

  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");

    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");

    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Getting commits...");

    callback(["commit1", "commit2", "commit3"]);
  }, 2000);
}

// Promises
// Async/await
