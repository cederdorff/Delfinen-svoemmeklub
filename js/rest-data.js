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
  const data = await response.json();

  const results = prepareMembersData(data);
  return results;
}

async function getMembersCoach(id) {
  const response = await fetch(`${endpoint}/members/${id}.json`);
  const data = await response.json();

  return data;
}

export { getMembers, getResults, getMembersCoach };
