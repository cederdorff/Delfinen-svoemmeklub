"use strict";

import { initViews } from "./view-router.js";
import { getMembers } from "./rest-data.js"

let members;

window.addEventListener("load", startApp);

function startApp() {
  console.log("app is running");
  initViews();

  updateMembersTable();
}

async function updateMembersTable() {
  members = await getMembers();
  console.log(members);
}
