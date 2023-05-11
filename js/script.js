"use strict";

import { initViews } from "./view-router.js";
import { determineWhatIsShownInNavbar } from "./dom.js";
import { getMembers } from "./rest-data.js";



let members;

window.addEventListener("load", startApp);

function startApp() {
  console.log("app is running");
  initViews();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document
    .querySelector("#logon-btn")
    .addEventListener("click", loginInLoginClicked);
}

function loginClicked() {
  document.querySelector("#login").showModal();
  document.querySelector("#login").scrollTop = 0;

  updateMembersTable();
}

function loginInLoginClicked() {
  determineWhatIsShownInNavbar();
  document.querySelector("#login").close();
}
async function updateMembersTable() {
  members = await getMembers();
  console.log(members);
}
