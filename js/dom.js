"use strict";

const password = true;

function addThreeNewLinksToNavBar() {
    if (password) {
        const threeNewLinks =
          /*html*/
          `<section>
          <a href="#forChairman">For formanden</a>
          <a href="#forTreasurer">For kasseren</a>
          <a href="#forCoach">For trænerne</a>
     `;

        document
            .querySelector(".dropdown-content")
            .insertAdjacentHTML("beforeend", threeNewLinks);
    }
    console.log("Tre nye links sat ind");
}

export {addThreeNewLinksToNavBar};
