import { getMembers, getResults } from "./rest-data.js";

function showCompetitiveMembers(members) {
  console.log("table bliver vist");
  for (const member of members) {
    if (member.activityForm == "konkurrence-svømmer") {
      showCompetitiveMember(member);
    }
  }
}

function showCompetitiveMember(memberObject) {
  document.querySelector("#for-coach-table").insertAdjacentHTML(
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
