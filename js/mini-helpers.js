import { members } from "./script.js";
import { showMembersForCashier } from "./cashier.js";
import { showMembersChairman } from "./script.js";

// ===== Search functions for cashier========== //
function inputSearchChangedForCashier() {
  const value = this.value;
  const membersToShowForCashier = searchMembersForCashier(value); // send 'members' som argument
  showMembersForCashier(membersToShowForCashier);
}
function searchMembersForCashier(searchValue) {
  // tag 'members' som argument
  searchValue = searchValue.toLowerCase();
  const results = members.filter(checkNameForCashier);
  function checkNameForCashier(member) {
    const name = member.firstname.toLowerCase();
    return name.includes(searchValue);
  }
  return results;
}

// ========== Search functions for chairman========== //
function inputSearchChangedForChairman() {
  const value = this.value;
  const membersToShowForChairman = searchMembersForChairman(value); // send 'members' som argument
  showMembersChairman(membersToShowForChairman);
}
function searchMembersForChairman(searchValue) {
  // tag 'members' som argument
  searchValue = searchValue.toLowerCase();
  const results = members.filter(checkNameForChairman);
  function checkNameForChairman(member) {
    const name = member.firstname.toLowerCase();
    return name.includes(searchValue);
  }
  return results;
}
export { inputSearchChangedForCashier, inputSearchChangedForChairman };
