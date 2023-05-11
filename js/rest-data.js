import { prepareMembersData } from "./helpers.js";

// ========== Global endpoint variable til firebase========== //
//const endpoint = "https://movies-forms-rest-crud-afl-default-rtdb.europe-west1.firebasedatabase.app/";
const endpoint = "../members";

async function getMembers() {
  const response = await fetch(`${endpoint}.json`);
  if (response.ok) {
    console.log("response is ok!")
  }
  const data = await response.json();

  const members = prepareMembersData(data);  
  return members;
}

export { getMembers };
