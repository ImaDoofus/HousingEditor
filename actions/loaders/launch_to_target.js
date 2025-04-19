export default (actionData) => {
  let sequence = [];

  sequence.push(["click", { slot: 10 }]);

  switch (actionData.location) {
    case "house_spawn":
      sequence.push(["click", { slot: 10 }]);
      break;
    case "current_location":
      sequence.push(["click", { slot: 11 }]);
      break;
    case "invokers_location":
      sequence.push(["click", { slot: 12 }]);
      break;
    case "custom_coordinates":
      sequence.push(["click", { slot: 13 }]);
      sequence.push(["anvil", { text: actionData.coordinates.join(" ") }]);
      break;
  }

  if (actionData.strength && actionData.strength !== "2") {
    sequence.push(["click", { slot: 14 }]);
    sequence.push(["anvil", { text: actionData.strength.toString() }]);
  }
  return ["Launch to Target", sequence];
};
