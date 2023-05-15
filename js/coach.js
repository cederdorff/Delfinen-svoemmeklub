import { getMembersCoach, getMembers } from "./rest-data.js";
import { results } from "./script.js";

// ----- global variable ----- //
let membersFiltered;
let isFilterOn;

async function showCompetitiveMembers(results) {
  // event listener til sort
  // document.querySelector("#sortBy-for-coach").addEventListener("change", sortByForCoach);

  // event listener til filtre
  // document.querySelector("#coachFilterTop5").addEventListener("change", filterforCoach);
  // document.querySelector("#coachFilterJunior").addEventListener("change", filterforCoach);
  // document.querySelector("#coachFilterSenior").addEventListener("change", filterforCoach);

  showCompetitiveMemberLoop(results);
}

function showCompetitiveMemberLoop(results) {
  document.querySelector("#coach-members-tbody").innerHTML = "";

  for (const result of results) {
    if (result.tournament === false) {
      showCompetitiveMember(result);
    }
  }
}

async function showCompetitiveMember(memberObject) {
  const member = await getMembersCoach(memberObject.memberId);
  document.querySelector("#coach-members-tbody").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
      <tr>
        <td>${member.firstname + " " + member.lastname}</td>
        <td>${member.age}</td>
        <td>${memberObject.disciplin}</td>
        <td>${memberObject.timeMiliSeconds}ms</td>
        <td>${memberObject.date}</td>
      </tr>
    `
  );
}

// ========== Sort ========== //

export { showCompetitiveMembers };
