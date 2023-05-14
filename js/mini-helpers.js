
// ========== Search functions ========== //
function inputSearchChanged() {
  const value = this.value;
  const membersToShow = searchMembers(members, value); // send 'members' som argument
  showMembersForCashier(membersToShow);
}

function searchMembers(members, searchValue) {
  // tag 'members' som argument
  searchValue = searchValue.toLowerCase();

  const results = members.filter(checkName);

  function checkName(member) {
    const name = member.firstname.toLowerCase();
    return name.includes(searchValue);
  }

  return results;
}

// export { inputSearchChanged };
