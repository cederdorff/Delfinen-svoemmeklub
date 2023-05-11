// ========== Laver objekt til array ========== //
function prepareMembersData(dataObject) {
  const membersArray = [];

  for (const key in dataObject) {
    const member = dataObject[key];
    member.id = key;
    membersArray.push(member);
  }
  return membersArray;
}

export { prepareMembersData };
