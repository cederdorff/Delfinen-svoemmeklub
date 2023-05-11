"use strict";

import { initViews } from "./view-router.js";
import { addThreeNewLinksToNavBar } from "./dom.js";

window.addEventListener("load", startApp);

function startApp() {
  console.log("app is running");
  initViews();
  addThreeNewLinksToNavBar();
}