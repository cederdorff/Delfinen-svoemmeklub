"use strict";

import { initViews } from "./view-router.js";
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
  addThreeNewLinksToNavBar();
  document.querySelector("#login").close();
}
async function updateMembersTable() {
  members = await getMembers();
  results = await getResults();
  console.log(members);
  console.log(results);
  showMembersForCashier(members)
}

function showMembersForCashier(membersList) {
  const table = document.querySelector("#cashier-members-tbody");
  for (let i = 0; i < table.rows.length; i++) {
    table.deleteRow(i);
  }
  for (const member of membersList) {
    showMemberForCashier(member);
  }
}

function showMemberForCashier(memberObject) {
  const htmlCashier = /*html*/`
                    <tr>
                      <td>${memberObject.firstname}</td>
                      <td>${memberObject.lastname}</td>
                      <td>${memberObject.age}</td>
                    </tr>
  `

  document.querySelector("#cashier-members-tbody").insertAdjacentHTML("beforeend", htmlCashier);
}
