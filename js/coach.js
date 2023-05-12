"use strict";

function showCompetitiveMembers(members) {
  createTable();
  for (const member of members) {
    if (member.activityForm == "konkurrence-svømmer" && member.age < 18) {
      showCompetitiveMemberJunior(member);
    } else if (member.activityForm == "konkurrence-svømmer" && member.age >= 18) {
      showCompetitiveMembersSenior(member);
    }
  }
}

function createTable() {
  document.querySelector("#for-coach-article").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <h2>Juniors</h2>
    <table id="for-coach-table-junior">
    <tr>
      <th>Navn</th>
      <th>Alder</th>
      <th>Disciplin(er)</th>
      <th>Tider</th>
      <th>Dato</th>
    </tr>
    </table>
    <h2>Seniors</h2>
    <table id="for-coach-table-senior">
    <tr>
      <th>Navn</th>
      <th>Alder</th>
      <th>Disciplin(er)</th>
      <th>Tider</th>
      <th>Dato</th>
    </tr>
    </table>
    `
  );
}

function showCompetitiveMemberJunior(memberObject) {
  document.querySelector("#for-coach-table-junior").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <tr>
        <td>${memberObject.firstname + " " + memberObject.lastname}</td>
        <td>${memberObject.age}</td>
        <td>${memberObject.disciplines}</td>
    </tr>
    `
  );
}

function showCompetitiveMembersSenior(memberObject) {
  document.querySelector("#for-coach-table-senior").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
      <tr>
          <td>${memberObject.firstname + " " + memberObject.lastname}</td>
          <td>${memberObject.age}</td>
          <td>${memberObject.disciplines}</td>
      </tr>
      `
  );
}

export { showCompetitiveMembers };
