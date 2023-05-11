"use strict";

import { initViews } from "./view-router.js";

let users;

window.addEventListener("load", startApp);

function startApp() {
  console.log("app is running");
  initViews();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document
    .querySelector("#logon-btn")
    .addEventListener("click", redirectUserByType);
}

function loginClicked() {
  document.querySelector("#login").showModal();
  document.querySelector("#login").scrollTop = 0;
}

// function redirectUserByType() {
//   const selectedRole = document.querySelector("#radio-btn-selection");
//   const selectedElement = selectedRole.value;
//   const typedUsername = document.querySelector("#username").value;
//   const typedPassword = document.querySelector("#password").value;
//   console.log(selectedElement);

//   // Check if the login information matches the selected role
//   if (
//     selectedElement === users.role &&
//     typedUsername === users.username &&
//     typedPassword === users.password
//   ) {
//     // Login successful
//     closeDialog();
//     displayCoachWebApp();
//   } else {
//     // Login failed
//     alert("Invalid login information!");
//   }
// }

// function closeDialog() {
//   var dialog = document.getElementById("login");
//   dialog.close();
// }

// function displayCoachWebApp() {
//   // Your code to display the coach's version of the web app
//   console.log("Displaying coach's web app...");
// }
