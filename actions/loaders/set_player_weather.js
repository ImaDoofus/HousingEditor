export default (actionData) => {
  let sequence = [];

  sequence.push(["click", { slot: 10 }]);

  switch (actionData.weather) {
    case "sunny":
      sequence.push(["click", { slot: 10 }]);
      break;
    case "raining":
      sequence.push(["click", { slot: 11 }]);
      break;
  }

  return ["Set Player Weather", sequence];
};
