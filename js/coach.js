import { getMembersCoach } from "./rest-data.js";
//import { members } from "./script.js";

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
        <td>${memberObject.firstname + " " + memberObject.lastname}</td>
        <td>${memberObject.age}</td>
        <td>${memberObject.disciplin}</td>
        <td>${memberObject.timeMiliSeconds}ms</td>
        <td>${memberObject.date}</td>
      </tr>
    </tbody>
    `
  );

  document.querySelector("#for-coach-table-junior tbody:last-child").addEventListener("click", showAthlete);
  
  function showAthlete(event) {
    console.log("athlete clicked");
    event.preventDefault;

    // adding evenlistener for close btn in dialog view
    document.querySelector("#coach-dialog-btn-close").addEventListener("click", closeCoachDialog);

    // setting textcontent value equal to clicked member
    document.querySelector("#coach-dialog-name").textContent = `Navn: ${memberObject.firstname} ${memberObject.lastname}`;
    document.querySelector("#coach-dialog-age").textContent = `Alder: ${memberObject.age}`;
    document.querySelector("#coach-dialog-phone").textContent = `Telefon: ${memberObject.phone}`;
    document.querySelector("#coach-dialog-mail").textContent = `E-mail: ${memberObject.email}`;
    document.querySelector("#coach-dialog-activity-form").textContent = `Aktivitets-form: ${memberObject.activityForm}`;
    document.querySelector("#coach-dialog-disciplines").textContent = `Disciplin(er): ${memberObject.disciplines}`;
    document.querySelector("#coach-dialog-coach").textContent = `Træner: ${memberObject.coach}`;
    document.querySelector("#coach-dialog-active").textContent = `Aktiv: ${memberObject.active}`;
    

    // show modal/dialog
    document.querySelector("#coach-dialog").showModal();
  }
}

//close cashier dialog
function closeCoachDialog() {
  document.querySelector("#coach-dialog").close();
}

export { showCompetitiveMembers };
