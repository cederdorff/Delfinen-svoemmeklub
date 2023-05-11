"use strict";

import { initViews } from "./view-router.js";
import { addThreeNewLinksToNavBar } from "./dom.js";
import { getMembers } from "./rest-data.js";

let members;

window.addEventListener("load", startApp);

function startApp() {
  console.log("app is running");
  initViews();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
}

function loginClicked() {
  document.querySelector("#login").showModal();
  document.querySelector("#login").scrollTop = 0;
  addThreeNewLinksToNavBar();

  updateMembersTable();
}

async function updateMembersTable() {
  members = await getMembers();
  console.log(members);
}
