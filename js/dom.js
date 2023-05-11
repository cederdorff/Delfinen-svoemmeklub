"use strict";

const passwordChairman = true;
const passwordTreasurer = false;
const passwordCoach = false;

// ========== Indsæt tre nye links i navbar ========== //
function addThreeNewLinksToNavBar() {
  if (passwordChairman) {
    const threeNewLinks =
      /*html*/
      `<section>
          <a href="#forChairman" class="view-link">For formanden</a>
          <a href="#forTreasurer" class="view-link">For kasseren</a>
          <a href="#for-coach-section" class="view-link" id="for-coach-btn">For trænerne</a>
     `;

    document.querySelector(".dropdown-content").insertAdjacentHTML("beforeend", threeNewLinks);
    console.log("Tre nye links sat ind");
  } else if (passwordTreasurer) {
    const linkForTreausurer =
      /*html*/
      `<section>
          <a href="#forTreasurer" class="view-link">For kasseren</a>
     `;

    document.querySelector(".dropdown-content").insertAdjacentHTML("beforeend", linkForTreausurer);
    console.log("Link for kasserer sat ind");
  } else if (passwordCoach) {
    const linkForCoach =
      /*html*/
      `<section>
          <a href="#for-coach-section" class="view-link" id="for-coach-btn">For Trænerne</a>
     `;

    document.querySelector(".dropdown-content").insertAdjacentHTML("beforeend", linkForCoach);
    console.log("Link for træner sat ind");
  } else {
  }
}

export { addThreeNewLinksToNavBar };
