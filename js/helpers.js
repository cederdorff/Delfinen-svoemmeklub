const endpoint = "https://crud-1st-semester-projekt-default-rtdb.firebaseio.com/";

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

async function createMember(
  firstname,
  lastname,
  age,
  phone,
  email,
  active,
  activityForm,
  disciplines,
  coach,
  subscriptionStart,
  member
) {
  const newMember = {
    firstname,
    lastname,
    age,
    phone,
    email,
    active,
    activityForm,
    disciplines,
    coach,
    subscriptionStart,
    member,
  };
  const newMemberJson = JSON.stringify(newMember);
  const response = await fetch(`${endpoint}/members.json`, {
    method: "POST",
    body: newMemberJson,
  });
  return response;
}

export { prepareMembersData, prepareResultsData, createMember };
