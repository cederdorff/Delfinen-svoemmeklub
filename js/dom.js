"use strict";

const chairman = document.querySelector("#login-formand");
const usernameChairman = "1234";
const passwordChairman = "1234";

const treasurer = document.querySelector("#login-kasserer");
const usernameTreasurer = "1234";
const passwordTreasurer = "1234";

const coach = document.querySelector("#login-coach");
const usernameCoach = "1234";
const passwordCoach = "1234";

// ========== Vælg, hvilken funktion, der kaldes efter login ========== // 
function decideWhatIsShownInNavbar() {
  if (
    chairman.checked
     &&
     passwordChairman === document.querySelector("#password").value  &&
     usernameChairman === document.querySelector("#username").value
  ) {
    addNewLinksToNavBarForChairman();
  }

  else if (
    treasurer.checked
    &&
     passwordTreasurer === document.querySelector("#password").value &&
     usernameTreasurer === document.querySelector("#username").value
  ) {
    addNewLinkToNavBarForTreasurer();
  }

  else if (coach.checked &&
     passwordCoach === document.querySelector("#password").value &&
    usernameCoach === document.querySelector("#username").value) 
    {
    addNewLinkToNavBarForCoach();
  }
  else {
    console.log("Ingen login-navne fundet");
    document.querySelector("#error-message-log-in").showModal();
    document.querySelector("#ok-button-error-message").addEventListener("click", closeErrorMessgeLogIn);
  }
}

function closeErrorMessgeLogIn() {
  document.querySelector("#error-message-log-in").close();
  console.log("fejlbesked lukkes");
}


// ========== Indsæt nye links i navbar for formand ========== //
function addNewLinksToNavBarForChairman() {
    const linksForChairman =
      /*html*/
      `<section>
          <a href="#forChairman" class="view-link">For formanden</a>
          <a href="#forTreasurer" class="view-link">For kasseren</a>
          <a href="#forCoach" class="view-link">For trænerne</a>
        </section>
     `;

    document
      .querySelector(".dropdown-content")
      .insertAdjacentHTML("beforeend", linksForChairman);
    console.log("Tre nye links sat ind");
}
// ========== Indsæt links i navbar for kasserer ========== //
    function addNewLinkToNavBarForTreasurer () {
  //  if (passwordTreasurer && usernameTreasurer) {
    const linkForTreausurer =
      /*html*/
      `<section>
          <a href="#forTreasurer" class="view-link">For kasseren</a>
       </section>
     `;

    document
      .querySelector(".dropdown-content")
      .insertAdjacentHTML("beforeend", linkForTreausurer);
    console.log("Link for kasserer sat ind");
   }

   // ========== Indsætlinks i navbar for træner ========== //
function addNewLinkToNavBarForCoach() {
  // if (passwordCoach && usernameCoach) {
    const linkForCoach =
      /*html*/
      `<section>
          <a href="#forCoach" class="view-link">For Trænerne</a>
       </section>
     `;

    document
      .querySelector(".dropdown-content")
      .insertAdjacentHTML("beforeend", linkForCoach);
    console.log("Link for træner sat ind");
  } 

export {
  decideWhatIsShownInNavbar
};
