"use strict";

import { initViews } from "./view-router.js";
import { determineWhatIsShownInNavbar } from "./dom.js";
import { getMembers, getResults } from "./rest-data.js";
import { showCompetitiveMembers } from "./coach.js";
// import { inputSearchChanged } from "./mini-helpers.js";

let members;
let results;

window.addEventListener("load", startApp);

async function startApp() {
  console.log("app is running");
  initViews();
  updateMembersTable();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document
    .querySelector("#logon-btn")
    .addEventListener("click", loginInLoginClicked);

  // -- Adding eventlisteners for search functions
  // --Eventlisteners for search functions for Cashier
  document
    .querySelector("#input-search-cashier")
    .addEventListener("keyup", inputSearchChangedForCashier);
  document
    .querySelector("#input-search-button-for-cashier")
    .addEventListener("search", inputSearchChangedForCashier);

  // --Eventlisteners for search functions for Chairman
  document
    .querySelector("#input-search-chairman")
    .addEventListener("keyup", inputSearchChangedForChairman);
  document
    .querySelector("#input-search-button-for-chairman")
    .addEventListener("search", inputSearchChangedForChairman);

  //-- Eventlistener på knap i detailedView for formanden, som lukker vinduet ---//
  const closeButton = document.querySelector("#close-button");
  closeButton.addEventListener("click", function () {
    const dialog = document.querySelector("#memberDetailedView");
    dialog.close();
  });

  document
    .querySelector(".btn-create")
    .addEventListener("click", createMemberClicked);
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
  members = await getMembers();
  results = await getResults();
  console.log(members);
  console.log(results);
  showMembersChairman(members);
  showMembersForCashier(members);
  showCompetitiveMembers(members, results);
}

function showMembersChairman(members) {
  var table = document.getElementById("membersTable");
   table.innerHTML = ""; // tømmer membersTAble for member elementer
  members.forEach(function (member) {
    var row = `
      <tr class="table-item">
        <td>${member.firstname}</td>
        <td>${member.lastname}</td>
        <td>${member.age}</td>
        <td>${member.phone}</td>
        <td>${member.email}</td>
        <td>${member.activityForm}</td>
        <td>${member.coach}</td>
        <td><button class="btn-update" data-id="${member.id}">Opdater</button></td>
        <td><button class="btn-delete" data-id="${member.id}">Slet</button></td>
      </tr>
    `;
    table.insertAdjacentHTML("beforeend", row);

    var tableItems = document.querySelectorAll(".table-item");
    tableItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        memberClicked(members[index]);
      });
    });

    document
      .querySelectorAll("#membersTable tr:last-child button")

      .forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent event from bubbling up to grid-item
        });
      });
  });
}

function memberClicked(member) {
  var dialog = document.querySelector("#memberDetailedView");
  document.querySelector("#dialog-header").textContent = member.firstname + " " + member.lastname;

  document.querySelector("#member-personalInfo").innerHTML =
    "Alder: " + member.age + " år" + "<br>" + "Telefon: " + member.phone + "<br>" + "E-mail: " + member.email;

  document.querySelector("#member-swimmerInfo").innerHTML = "Medlemskabsstatus: ";
  if (member.active) {
    document.querySelector("#member-swimmerInfo").innerHTML += "Aktiv" + "<br>";
  } else {
    document.querySelector("#member-swimmerInfo").innerHTML += "Passiv" + "<br>";
  }

  document.querySelector("#member-swimmerInfo").innerHTML += "Medlemskabstype: " + member.activityForm + "<br>";

  if (member.disciplines && member.disciplines.length > 0) {
    document.querySelector("#member-swimmerInfo").innerHTML += "Discipliner: " + member.disciplines.join(", ") + "<br>";
  }

  if (member.coach && member.coach !== "") {
    document.querySelector("#member-swimmerInfo").innerHTML += "Træner: " + member.coach + "<br>";
  }

  document.querySelector("#membershipInfo").innerHTML =
    "Startede i klubben: " + member.subscriptionStart + "<br>" + "Stoppede i klubben: " + member.subscriptionEnd;

  if (!dialog.open) {
    dialog.showModal();
    dialog.scrollTop = 0;
  }
}

document.querySelector("#forChairman").insertAdjacentHTML(
  "beforeend",
  `
<h1>Medlemmer</h1>
<button class="btn-create">Nyt medlem</button>
  <table id="membersTable" class="table-view">
        <tr>
        <th>Fornavn</th>
        <th>Efternavn</th>
        <th>Alder</th>
        <th>Telefon</th>
        <th>Mail</th>
        <th>Aktivitetsform</th>
        <th>Træner</th>
        <th>Opdater</th>
        <th>Slet</th>
        </tr>        
        </table>
        `
);

//-- Create member //

function createMemberClicked() {
  document.querySelector("#create-member").showModal();
  document.querySelector("#create-member").scrollTop = 0;
  showMembersForCashier(members);
}

// ========== Cashier functions ========== //

function showMembersForCashier(membersList) {
  document.querySelector("#cashier-members-tbody").innerHTML = ""; // tømmer tbody for member elementer
  //#cashier-members-tbody sættes til en variable kaldt "table"
  const table = document.querySelector("#cashier-members-tbody");

  insertCashierAccountingSection();
  //alle rows i tabel slettes
  for (let i = 0; i < table.rows.length; i++) {
    table.deleteRow(i);
  }

  //en row skabes i table for hvert medlem i members array
  for (const member of membersList) {
    showMemberForCashier(member);
  }
}

//function for creating row member element
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
                      <td>${memberObject.restance} ${memberObject.active}</td>
                    </tr>
  `;

  document.querySelector("#cashier-members-tbody").insertAdjacentHTML("beforeend", htmlCashier);

  // adding evenlistener for showing dialog view on table row subject
  document.querySelector("#cashier-members-tbody tr:last-child").addEventListener("click", cashierMemberClicked);

  //function for creating dialog view(cashier)
  function cashierMemberClicked(event) {
    event.preventDefault;

    // adding evenlistener for close btn in dialog view
    document.querySelector("#cashier-dialog-btn-close").addEventListener("click", closeCashierDialog);

    // setting textcontent value equal to clicked member
    document.querySelector("#cashier-dialog-name").textContent = `Navn: ${memberObject.firstname} ${memberObject.lastname}`;
    document.querySelector("#cashier-dialog-age").textContent = `Alder: ${memberObject.age}`;
    document.querySelector("#cashier-dialog-phone").textContent = `Telefon: ${memberObject.phone}`;
    document.querySelector("#cashier-dialog-mail").textContent = `E-mail: ${memberObject.email}`;
    document.querySelector("#cashier-dialog-sub-start").textContent = `Tilmeldt: ${memberObject.subscriptionStart}`;
    document.querySelector("#cashier-dialog-sub-end").textContent = `Medlemskab ophører: ${memberObject.subscriptionEnd}`;
    document.querySelector("#cashier-dialog-restance").textContent = `Restance: ${memberObject.restance}`;

    // show modal/dialog
    document.querySelector("#cashier-dialog").showModal();
  }
}

//close cashier dialog
function closeCashierDialog() {
  document.querySelector("#cashier-dialog").close();
}

//correcting restance to yes/no instead of true/false
function correctRestance(memberObject) {
  if (memberObject.restance) {
    memberObject.restance = "Ja!";
  } else {
    memberObject.restance = "Nej!";
  }
}

//inserting html article element for accounting overview
function insertCashierAccountingSection() {
  let budgetteret = calculateAllSubscriptions(members);
  let realiseret = calculateRestance(members);
  let samlet = budgetteret - realiseret;
  const accountingSection = /*html*/ `
                          <article id="accounting-section">
                            <h2>Kontingent oversigt:</h2>
                            <p>Kontingenter: ${budgetteret}</p>
                            <p>Restance: ${realiseret}</p>
                            <p>samlet: ${samlet}</p>
                          </article>
  `;

  document.querySelector("#forCashier").insertAdjacentHTML("afterbegin", accountingSection);
}

//calculating sum of all subscriptions
function calculateAllSubscriptions(membersList) {
  let result = 0;

  for (let i = 0; i < membersList.length; i++) {
    const element = membersList[i];
    if (element.active && element.age < 18) {
      // active u18 =+ 1000,-
      result += 1000;
    } else if (element.active && element.age >= 18 && element.age <= 60) {
      // active 18+ =+ 1600,-
      result += 1600;
    } else if (element.active && element.age > 60) {
      // active 60+ = (1600 * 0,75) = 1200,-
      result += 1200;
    } else if (!element.active) {
      // inactive = 500,-
      result += 500;
    }
  }

  return result;
}

//calculating sum of members in restance
function calculateRestance(membersList) {
  let result = 0;

  for (let i = 0; i < membersList.length; i++) {
    const element = membersList[i];
    if (element.restance && element.active && element.age < 18) {
      // active u18 =+ 1000,-
      result += 1000;
    } else if (element.restance && element.active && element.age >= 18 && element.age <= 60) {
      // active 18+ =+ 1600,-
      result += 1600;
    } else if (element.restance && element.active && element.age > 60) {
      // active 60+ = (1600 * 0,75) = 1200,-
      result += 1200;
    } else if (element.restance && !element.active) {
      // inactive = 500,-
      result += 500;
    }
  }

  return result;
}


// ========== Search functions for cashier========== //
function inputSearchChangedForCashier() {
  const value = this.value;
  const membersToShowForCashier = searchMembersForCashier(value); // send 'members' som argument
  showMembersForCashier(membersToShowForCashier);
}

function searchMembersForCashier(searchValue) {
  // tag 'members' som argument
  searchValue = searchValue.toLowerCase();

  const results = members.filter(checkNameForCashier);

  function checkNameForCashier(member) {
    const name = member.firstname.toLowerCase();
    return name.includes(searchValue);
  }

  return results;
}


// ========== Search functions for chairman========== //
function inputSearchChangedForChairman() {
  const value = this.value;
  const membersToShowForChairman = searchMembersForChairman(value); // send 'members' som argument
  showMembersChairman(membersToShowForChairman);
}

function searchMembersForChairman(searchValue) {
  // tag 'members' som argument
  searchValue = searchValue.toLowerCase();

  const results = members.filter(checkNameForChairman);

  function checkNameForChairman(member) {
    const name = member.firstname.toLowerCase();
    return name.includes(searchValue);
  }

  return results;
}

// export { inputSearchChanged };
