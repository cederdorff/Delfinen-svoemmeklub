"use strict";

import { initViews } from "./view-router.js";
import { addThreeNewLinksToNavBar } from "./dom.js";
import { getMembers } from "./rest-data.js"

let members;

window.addEventListener("load", startApp);

function startApp() {
  console.log("app is running");
  initViews();
  addThreeNewLinksToNavBar();

  updateMembersTable();
}

async function updateMembersTable() {
  members = await getMembers();
  console.log(members);
}
