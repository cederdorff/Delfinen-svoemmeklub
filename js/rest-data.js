import { prepareMembersData } from "./helpers.js";

// ========== Global endpoint variable til firebase========== //
const endpoint = "https://crud-1st-semester-projekt-default-rtdb.firebaseio.com/";
// const endpoint = "../members";

async function getMembers() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();

  const members = prepareMembersData(data);
  return members;
}

async function getResults() {
  const response = await fetch(`${endpoint}/results.json`);
  if (response.ok) {
    console.log("response is ok!");
  }
  const data = await response.json();

  const results = prepareMembersData(data);
  return results;
}

export { getMembers, getResults };
