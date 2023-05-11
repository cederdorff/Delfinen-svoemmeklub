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

  correctRestance(memberObject);

  const htmlCashier = /*html*/ `
                    <tr>
                      <td>${memberObject.firstname} ${memberObject.lastname}</td>
                      <td>${memberObject.age}</td>
                      <td>${memberObject.email}</td>
                      <td>${memberObject.phone}</td>
                      <td>${memberObject.subscriptionStart}</td>
                      <td>${memberObject.subscriptionEnd}</td>
                      <td>${memberObject.restance}</td>
                    </tr>
  `;

  document.querySelector("#cashier-members-tbody").insertAdjacentHTML("beforeend", htmlCashier);
}

function correctRestance(memberObject) {
  if (memberObject.restance) {
    memberObject.restance = "Ja!"
  } else {
    memberObject.restance = "Nej!"
  }
}
