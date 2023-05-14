import { getResults } from "./rest-data.js";

async function showCompetitiveMembers(members) {
  const results = await getResults();
  const traningTime = [];
  createTable();

  for (const memberId in members) {
    const member = members[memberId];
    console.log(memberId);
    if (member.activityForm === "konkurrence-svømmer" && member.age < 18) {
      for (const resultId in results) {
        const result = results[resultId];
        // console.log(result);

        if (result.memberId === memberId) {
          traningTime.push(result);
        }
      }
      showCompetitiveMemberJunior(member, traningTime);
    } else if (member.activityForm === "konkurrence-svømmer" && member.age >= 18) {
      for (const resultId in results) {
        const result = results[resultId];

        if (result.memberId === memberId) {
          traningTime.push(result);
        }
      }
      showCompetitiveMembersSenior(member, traningTime);
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

async function showCompetitiveMemberJunior(memberObject, results) {
  console.log(results);
  document.querySelector("#for-coach-table-junior").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <tr>
        <td>${memberObject.firstname + " " + memberObject.lastname}</td>
        <td>${memberObject.age}</td>
        <td>${memberObject.disciplines}</td>
        <td>${results}</td>

    </tr>
    `
  );
}

async function showCompetitiveMembersSenior(memberObject) {
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
