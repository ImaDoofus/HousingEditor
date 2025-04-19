export default (actionData) => {
  let sequence = [];

  if (actionData.x && actionData.x != "10") {
    sequence.push(["click", { slot: 10 }]);
    sequence.push(["anvil", { text: actionData.x.toString() }]);
  }

  if (actionData.y && actionData.y != "10") {
    sequence.push(["click", { slot: 11 }]);
    sequence.push(["anvil", { text: actionData.y.toString() }]);
  }

  if (actionData.z && actionData.z != "10") {
    sequence.push(["click", { slot: 12 }]);
    sequence.push(["anvil", { text: actionData.z.toString() }]);
  }
  return ["Change Velocity", sequence];
};
