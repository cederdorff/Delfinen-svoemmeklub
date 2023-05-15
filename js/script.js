"use strict";

import { initViews } from "./view-router.js";
import { determineWhatIsShownInNavbar } from "./dom.js";
import { getMembers, getResults } from "./rest-data.js";
import { createMember } from "./helpers.js";
import { showCompetitiveMembers } from "./coach.js";
import { showMembersForCashier, cashierFilterByRestance } from "./cashier.js";

let members;
let results;

window.addEventListener("load", startApp);

async function startApp() {
  console.log("app is running");
  initViews();
  updateMembersTable();

  document.querySelector("#login-btn").addEventListener("click", loginClicked);
  document.querySelector("#logon-btn").addEventListener("click", loginInLoginClicked);

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

  //eventlistener for cashier filter(s)
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

document.querySelector("#forChairman").insertAdjacentHTML(
  "beforeend",
  `
  <h1>Medlemmer</h1>
  <button class="btn-create">Nyt medlem</button>
  <table id="membersTable" class="table-view">
    <thead>
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
    </thead>
    <tbody id="membersTableBody"></tbody>
  </table>
`
);

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

function showMembersChairman() {
  const tableBody = document.querySelector("#membersTableBody");
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
    tableBody.insertAdjacentHTML("beforeend", row);

    var tableItems = document.querySelectorAll(".table-item");
    tableItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        memberClicked(members[index]);
      });
    });

    document.querySelectorAll("#membersTableBody tr:last-child button").forEach((button) => {
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

  // Format the subscription dates before displaying them
  let subscriptionStart = member.subscriptionStart ? formatDate(member.subscriptionStart) : "";
  let subscriptionEnd = member.subscriptionEnd ? formatDate(member.subscriptionEnd) : "";

  document.querySelector("#membershipInfo").innerHTML =
    "Startede i klubben: " + subscriptionStart + "<br>" + "Stoppede i klubben: " + subscriptionEnd;

  if (!dialog.open) {
    dialog.showModal();
    dialog.scrollTop = 0;
  }
}

//-- Create member //

function createMemberClicked() {
  document.querySelector("#create-member").showModal();
  document.querySelector("#create-member").scrollTop = 0;
  showMembersForCashier(members);
}

function formatDate(dateString) {
  if (!dateString || isNaN(Date.parse(dateString))) {
    return ""; // Return an empty string for invalid or empty date string
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

async function createMemberSubmitted(event) {
  event.preventDefault();
  const form = document.querySelector("form#form-create");
  const member = {
    firstname: form.querySelector("#firstname-create").value,
    lastname: form.querySelector("#lastname-create").value,
    age: form.querySelector("#age-create").value,
    phone: form.querySelector("#phone-create").value,
    email: form.querySelector("#email-create").value,
    active: form.querySelector('input[name="active"]:checked').value === "active",
    disciplines: form
      .querySelector("#disciplines-create")
      .value.split(",")
      .map((item) => item.trim()),
    coach: form.querySelector("#coach-create").value,
    subscriptionStart: form.querySelector("#subscriptionstart-create").value,
  };

  // Set activityForm based on the selected radio button
  const activityFormOption1 = form.querySelector("#activityform-create-option1");
  const activityFormOption2 = form.querySelector("#activityform-create-option2");
  const activityFormOption3 = form.querySelector("#activityform-create-option3");

  if (activityFormOption1.checked) {
    member.activityForm = "Konkurrencesvømmer";
  } else if (activityFormOption2.checked) {
    member.activityForm = "Motionistsvømmer";
  } else if (activityFormOption3.checked) {
    member.activityForm = "Seniorsvømmer";
  }

  const response = await createMember(
    member.firstname,
    member.lastname,
    member.age,
    member.phone,
    member.email,
    member.active,
    member.activityForm,
    member.disciplines,
    member.coach,
    member.subscriptionStart
  );

  if (response.ok) {
    console.log("New member added");
    updateMembersTable();
    console.log(members);
  }

  document.querySelector("#create-member").close(); // close dialog
}

export { members };
