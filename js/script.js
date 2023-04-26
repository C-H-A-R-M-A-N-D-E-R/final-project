class User {
  constructor(name, username, password, isAdmin = false) {
    this._name = name;
    this._username = username;
    this._password = password;
    this._isAdmin = isAdmin;
  }

  // Getters Functions.
  getName() {
    return this._name;
  }

  getIsAdmin() {
    return this._isAdmin;
  }

  verifyAccess(username, password) {
    return this._username === username && this._password === password;
  }

  // Convert an instance of User to a plain JavaScript object
  toObject() {
    return {
      name: this._name,
      username: this._username,
      password: this._password,
      isAdmin: this._isAdmin,
    };
  }

  // Create a new instance of User from a plain JavaScript object
  static fromObject(obj) {
    return new User(obj.name, obj.username, obj.password, obj.isAdmin);
  }
}

// Retrieve the "users" item from local storage.
const storedUsers = localStorage.getItem("users");
// Execute only if the stored users is empty.
if (storedUsers !== null) {
  // Create a default set of users: the cashier and admin.
  const users = [
    new User("ADMIN", "admin", "admin", true),
    new User("CASHIER 1", "cashier1", "cashier1"),
    new User("CASHIER 2", "cashier2", "cashier2"),
    new User("CASHIER 3", "cashier3", "cashier3"),
  ];
  // Convert the array of User instances to an array of plain JavaScript objects
  const usersAsObjects = users.map((user) => user.toObject());
  // Store the array of plain JavaScript objects in local storage
  localStorage.setItem("users", JSON.stringify(usersAsObjects));
}

// Create the default user as the administrator.
$(document).ready(function () {
  const login = localStorage.getItem("user");
  if (login !== null) {
    console.log("already logged in!");
  }

  /**
   * HELLO!
   * MODIFY THIS FORM (EX. userForm)...
   * DELETE THIS COMMENT...
   */
  $("#cashierForm").submit((event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = $("#cashierUsername").val();
    const password = $("#cashierPassword").val();
    // Retrieve the array of plain JavaScript objects from local storage
    const storedUsersAsObjects = JSON.parse(localStorage.getItem("users"));
    // Convert the array of plain JavaScript objects back to an array of User instances
    const storedUsers = storedUsersAsObjects.map((obj) => User.fromObject(obj));

    // Find a user object in the parsedUsers array that matches the provided username and password
    const userLogin = storedUsers.find((user) =>
      user.verifyAccess(username, password)
    );

    if (userLogin !== undefined) {
      // Store the class as plain javascript object in local storage.
      const userStringify = JSON.stringify(userLogin.toObject());
      // Store the string in local storage with a key
      localStorage.setItem("user", userStringify);
      // Redirect to the cashier dashboard page
      window.location.href = "dashboard.html";
      return;
    }

    // If the username and password are not valid for cashier, show an error message
    alert("Invalid username or password for cashier. Please try again.");
  });
});
