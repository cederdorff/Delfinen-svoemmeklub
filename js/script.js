"use strict";

import { initViews } from "./view-router.js";
import { determineWhatIsShownInNavbar } from "./dom.js";
import { getMembers, getResults } from "./rest-data.js";
import { showCompetitiveMembers } from "./coach.js";
import { showMembersForCashier, insertAccountingResults } from "./cashier.js";
import { inputSearchChangedForCashier, inputSearchChangedForChairman } from "./mini-helpers.js";


let members;
let results;

window.addEventListener("load", startApp);

async function startApp() {
  console.log("app is running");
  initViews();
  updateMembersTable();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document.querySelector("#logon-btn").addEventListener("click", loginInLoginClicked);

  // -- Adding eventlisteners for search functions
  // --Eventlisteners for search functions for Cashier
  document.querySelector("#input-search-cashier").addEventListener("keyup", inputSearchChangedForCashier);
  document.querySelector("#input-search-button-for-cashier").addEventListener("search", inputSearchChangedForCashier);

  // --Eventlisteners for search functions for Chairman
  document.querySelector("#input-search-chairman").addEventListener("keyup", inputSearchChangedForChairman);
  document.querySelector("#input-search-button-for-chairman").addEventListener("search", inputSearchChangedForChairman);

  //-- Eventlistener på knap i detailedView for formanden, som lukker vinduet ---//
  const closeButton = document.querySelector("#close-button");
  closeButton.addEventListener("click", function () {
    const dialog = document.querySelector("#memberDetailedView");
    dialog.close();
  });

  const closeButtonCreateMember = document.querySelector("#create-close-btn");
  closeButtonCreateMember.addEventListener("click", function () {
    const dialog = document.querySelector("#create-member");
    dialog.close();
  });

  document.querySelector(".btn-create").addEventListener("click", createMemberClicked);
  document.querySelector("form#form-create").addEventListener("submit", createMemberSubmitted);
}

function loginClicked() {
  document.querySelector("#login").showModal();
  document.querySelector("#login").scrollTop = 0;
}

async function loginInLoginClicked() {
  members = await getMembers();
  results = await getResults();
  determineWhatIsShownInNavbar();
  // Virker det bedre at kalde insertAccountingResults() herfra?
  insertAccountingResults();
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
  showMembersChairman(members);
  showMembersForCashier(members);
  showCompetitiveMembers(results);
}

export { members, updateMembersTable };
