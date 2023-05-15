import { getMembersCoach, getMembers } from "./rest-data.js";
import { results, members } from "./script.js";

// ----- global variable ----- //
let membersFiltered;
let isFilterOn;

async function showCompetitiveMembers(results) {
  // event listener til sort
  // document.querySelector("#sortBy-for-coach").addEventListener("change", sortByForCoach);

  // event listener til filtre
  document.querySelector("#coachFilterTop5").addEventListener("change", filterforCoach);
  document.querySelector("#coachFilterJunior").addEventListener("change", filterforCoach);
  document.querySelector("#coachFilterSenior").addEventListener("change", filterforCoach);

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

async function filterforCoach() {
  let filterList = members;
  const top5 = document.querySelector("#coachFilterTop5");
  const junior = document.querySelector("#coachFilterJunior");
  const senior = document.querySelector("#coachFilterSenior");

  if (junior.checked) {
    filterList = members.filter(isJunior);
    console.log(filterList);
  } else if (senior.checked) {
    filterList = members.filter(isSenior);
    console.log(filterList);
  } else if (top5.checked) {
    filterList = results.sort(top5Results);
    filterList.splice(5);
    console.log(filterList);
  }
}

function top5Results(result1, result2) {
  if (results.tournament == false) {
    return result1.timeMiliSeconds - result2.timeMiliSeconds;
  }
}

function isJunior(result) {
  return result.age < 18 && result.activityForm === "konkurrence-svømmer";
}
function isSenior(result) {
  return result.age >= 18 && result.activityForm === "konkurrence-svømmer";
}

export { showCompetitiveMembers };
