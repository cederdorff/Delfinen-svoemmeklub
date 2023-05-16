"use strict";

import { initViews } from "./view-router.js";
import { determineWhatIsShownInNavbar } from "./dom.js";
import { getMembers, getResults } from "./rest-data.js";
import { showCompetitiveMembers } from "./coach.js";
import { showMembersForCashier, cashierFilterByRestance } from "./cashier.js";
import { showMembersChairman } from "./chairman.js";

let members;
let results;

window.addEventListener("load", startApp);

async function startApp() {
  console.log("app is running");
  initViews();
  updateMembersTable();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document.querySelector("#logon-btn").addEventListener("click", loginInLoginClicked);

  document.querySelector("#restance-filter").addEventListener("change", cashierFilterByRestance);
}

function loginClicked() {
  document.querySelector("#login").showModal();
  document.querySelector("#login").scrollTop = 0;
}

async function loginInLoginClicked() {
  members = await getMembers();
  results = await getResults();
  determineWhatIsShownInNavbar();
  // tilføjet event listener for ny lavet coach knap.
  // document.querySelector("#for-coach-btn").addEventListener("click", showCompetitiveMembers(members, results));
  document.querySelector("#login").close();
}

async function updateMembersTable() {
  const tableBody = document.querySelector("#membersTableBody");
  tableBody.innerHTML = "";
  members = await getMembers();
  results = await getResults();
  console.log(members);
  console.log(results);
  showMembersChairman();
  showMembersForCashier(members);
  showCompetitiveMembers(results);
}

export { members, updateMembersTable };
