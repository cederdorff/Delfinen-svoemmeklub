"use strict";

import { initViews } from "./view-router.js";
import { addThreeNewLinksToNavBar } from "./dom.js";
import { getMembers, getResults } from "./rest-data.js";
import { showCompetitiveMembers } from "./coach.js";

let members;
let results;

window.addEventListener("load", startApp);

async function startApp() {
  console.log("app is running");
  initViews();
  updateMembersTable();

  // fjern efter test
  members = await getMembers();
  results = await getResults();
  showCompetitiveMembers(members, results);

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document.querySelector("#logon-btn").addEventListener("click", loginInLoginClicked);
}

function loginClicked() {
  document.querySelector("#login").showModal();
  document.querySelector("#login").scrollTop = 0;
}

async function loginInLoginClicked() {
  members = await getMembers();
  results = await getResults();
  addThreeNewLinksToNavBar();
  // tilføjet event listener for ny lavet coach knap.
  document.querySelector("#for-coach-btn").addEventListener("click", showCompetitiveMembers(members, results));
  document.querySelector("#login").close();
}

async function updateMembersTable() {
  members = await getMembers();
  results = await getResults();
  console.log(members);
  console.log(results);
}
