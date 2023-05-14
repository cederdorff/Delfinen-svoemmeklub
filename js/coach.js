import { getMembersCoach } from "./rest-data.js";

async function showCompetitiveMembers(results) {
  createTable();
  // for (const member of members) {
  //   if (member.activityForm === "konkurrence-svømmer" ) {
  //     console.log("Konkurrence-svømmer create");
  //     showCompetitiveMember(member);
  //   }
  // }

  for (const result of results) {
    if (result.tournament === false) {
      showCompetitiveMember(result);
    }
  }
}

function createTable() {
  document.querySelector("#for-coach-article").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <h2>Atleter</h2>
    <table id="for-coach-table-junior">
    <thead>
      <tr>
        <th>Navn</th>
        <th>Alder</th>
        <th>Disciplin(er)</th>
        <th>Tider</th>
        <th>Dato</th>
      </tr>
    </thead>
    </table>
    `
  );
}

async function showCompetitiveMember(memberObject) {
  const member = await getMembersCoach(memberObject.memberId);
  document.querySelector("#for-coach-table-junior").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <tbody>
      <tr>
        <td>${member.firstname + " " + member.lastname}</td>
        <td>${member.age}</td>
        <td>${memberObject.disciplin}</td>
        <td>${memberObject.timeMiliSeconds}ms</td>
        <td>${memberObject.date}</td>
      </tr>
    </tbody>
    `
  );
}

export { showCompetitiveMembers };
