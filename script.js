function getusers() {
  fetch("https://60efffc3f587af00179d3c2f.mockapi.io/users", {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .then((users) => {
      loadUser(users);
    });
}

function loadUser(users) {
  const user = document.createElement("div");
  user.className = "user-list";

  users.forEach((userlist) => {
    const userContainer = document.createElement("div");
    userContainer.className = "user-container";
    userContainer.innerHTML = `
  <img class = "user-image"src=${userlist.avatar}></img>
  <div>
  <h3 class="user-name">${userlist.name}</h3>
  <p class = "user-date">${new Date(userlist.createdAt).toDateString()}</p>
  <button onclick="deleteUser(${userlist.id})">Delete</button>
  </div>
  `;

    user.append(userContainer);
  });
  document.body.append(user);
}

getusers();

function addUser() {
  const name = document.querySelector(".name").value;
  const avatar = document.querySelector(".image").value;
  const createdAt = new Date();
  const userDetails = {
    name: name,
    avatar: avatar,
    createdAt: createdAt,
  };
  fetch("https://60efffc3f587af00179d3c2f.mockapi.io/users", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  })
    .then((data) => {
      return data.json();
    })
    .then((users) => {
      refreshUsers();
    });
}

function refreshUsers() {
  // userList
  document.querySelector(".user-list").remove();
  getusers();
}

function deleteUser(id) {
  console.log("Deleting", id);
  fetch(`https://60efffc3f587af00179d3c2f.mockapi.io/users/${id}`, {
    method: "DELETE",
  })
    .then((data) => {
      return data.json();
    })
    .then((users) => {
      refreshUsers();
    });
}
