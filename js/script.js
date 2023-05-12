"use strict";

import { initViews } from "./view-router.js";
import { determineWhatIsShownInNavbar } from "./dom.js";
import { getMembers } from "./rest-data.js";
import { addThreeNewLinksToNavBar } from "./dom.js";
import { getMembers, getResults } from "./rest-data.js";



let members;
let results;

window.addEventListener("load", startApp);

function startApp() {
  console.log("app is running");
  initViews();
  updateMembersTable();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document.querySelector("#logon-btn").addEventListener("click", loginInLoginClicked);
}

function loginClicked() {
  document.querySelector("#login").showModal();
  document.querySelector("#login").scrollTop = 0;

}

function loginInLoginClicked() {
  determineWhatIsShownInNavbar();
  document.querySelector("#login").close();
}
async function updateMembersTable() {
  members = await getMembers();
  results = await getResults();
  console.log(members);
  console.log(results);
}
