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

function prepareResultsData(dataObject) {
  const resultsArray = [];

  for (const key in dataObject) {
    const result = dataObject[key];
    result.id = key;
    resultsArray.push(result);
  }
  return resultsArray;
}

export { prepareMembersData, prepareResultsData };
