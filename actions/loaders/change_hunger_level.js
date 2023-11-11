export default (actionData) => {
  let sequence = [];

  if (actionData.level && actionData.level !== "20") {
    sequence.push(["click", { slot: 10 }]);
    sequence.push(["anvil", { text: actionData.level }]);
  }

  if (actionData.mode && actionData.mode !== "set") {
    sequence.push(["click", { slot: 11 }]);
    if (actionData.mode === "increment") sequence.push(["click", { slot: 10 }]);
    if (actionData.mode === "decrement") sequence.push(["click", { slot: 11 }]);
    if (actionData.mode === "multiply") sequence.push(["click", { slot: 13 }]);
    if (actionData.mode === "divide") sequence.push(["click", { slot: 14 }]);
  }

  return ["Change Hunger Level", sequence];
};
