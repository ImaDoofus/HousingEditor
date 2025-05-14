export default (actionData) => {
  let sequence = [];

  if (actionData.holder !== "player") {
    sequence.push(["click", { slot: 10 }]);
    if (actionData.holder === "global") sequence.push(["click", { slot: 11 }]);
    if (actionData.holder === "team") sequence.push(["click", { slot: 12 }]);
  }

  var slot = 0;
  if (actionData.holder === "team") {
    slot = 1;
    if (actionData.team) {
      sequence.push(["click", { slot: 11 }]);
      sequence.push(["option", { option: actionData.team }]);
    }
  }

  if (actionData.stat && actionData.stat !== "Kills") {
    sequence.push(["click", { slot: 11 + slot }]);
    sequence.push(["chat", { text: actionData.stat }]);
  }

  if (actionData.mode && actionData.mode !== "increment") {
    sequence.push(["click", { slot: 12 + slot }]);
    
    if (actionData.mode === "unset") sequence.push(["click", { slot: 10 }]);
    if (actionData.mode === "set") sequence.push(["click", { slot: 11 }]);
    if (actionData.mode === "decrement") sequence.push(["click", { slot: 13 }]);
    if (actionData.mode === "multiply") sequence.push(["click", { slot: 14 }]);
    if (actionData.mode === "divide") sequence.push(["click", { slot: 15 }]);
  }

  if (actionData.value !== "1L") {
    sequence.push(["click", { slot: 13 + slot }]);
    sequence.push(["chat", { text: actionData.value }]);
  }

  if (actionData.auto_unset) {
    sequence.push(["click", { slot: 14 + slot }]);
  }

  return ["Change Variable", sequence];
};
