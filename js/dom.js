"use strict";

const password = true;

function addThreeNewLinksToNavBar() {
  if (password) {
    const threeNewLinks =
      /*html*/
      `<section>
          <a href="#forChairman" class="view-link">For formanden</a>
          <a href="#forTreasurer" class="view-link">For kasseren</a>
          <a href="#forCoach" class="view-link">For trænerne</a>
     `;

    document
      .querySelector(".dropdown-content")
      .insertAdjacentHTML("beforeend", threeNewLinks);
    console.log("Tre nye links sat ind");
  } else {
  }
}

export { addThreeNewLinksToNavBar };
