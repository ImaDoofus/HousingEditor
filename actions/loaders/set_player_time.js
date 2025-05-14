export default (actionData) => {
  let sequence = [];

  sequence.push(["click", { slot: 10 }]);

  switch (actionData.time) {
    case "reset_to_world_time":
      sequence.push(["click", { slot: 10 }]);
      break;
    case "sunrise":
      sequence.push(["click", { slot: 11 }]);
      break;
    case "noon":
      sequence.push(["click", { slot: 12 }]);
      break;
    case "sunset":
      sequence.push(["click", { slot: 13 }]);
      break;
    case "midnight":
      sequence.push(["click", { slot: 14 }]);
      break;
    case "custom_time":
      sequence.push(["click", { slot: 48 }]);
      sequence.push(["anvil", { text: actionData.customTime }]);
      break;
  }

  return ["Set Player Time", sequence];
};
