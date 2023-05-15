import { prepareMembersData } from "./helpers.js";

// ========== Global endpoint variable til firebase========== //
const endpoint = "https://crud-1st-semester-projekt-default-rtdb.firebaseio.com/";
// const endpoint = "../members";

async function getMembers() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();

  if (data && typeof data === "object") {
    const members = prepareMembersData(data);
    return members;
  } else {
    return [];
  }
}

function prepareResultsData(dataObject) {
  const resultsArray = [];

  for (const key in dataObject) {
    const result = dataObject[key];
    result.id = key;
    resultsArray.push(result);
  }
  return resultsArray;
}

async function getResults() {
  const response = await fetch(`${endpoint}/results.json`);
  const data = await response.json();

  const results = prepareResultsData(data);
  return results;
}

async function getMembersCoach(id) {
  const response = await fetch(`${endpoint}/members/${id}.json`);
  const data = await response.json();

  return data;
}

// === DELETE (DELETE) === //
async function deleteMember(id) {
  const url = `${endpoint}/members/${id}.json`;
  const response = await fetch(url, { method: "DELETE" });
  console.log(response);
  return response;
}

// === UPDATE Member Chairman ===///
async function updateMemberChairman(id, member) {
  const memberAsJson = JSON.stringify(member);
  const url = `${endpoint}/members/${id}.json`;

  const response = await fetch(url, { method: "PUT", body: memberAsJson });
  const data = await response.json();
  return response;
}
export { getMembers, getResults, getMembersCoach, deleteMember, updateMemberChairman };
