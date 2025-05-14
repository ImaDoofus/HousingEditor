export default (actionData) => {
  let sequence = [];

  if (!actionData.displayNametag) {
    sequence.push(["click", { slot: 10 }]);
  }

  return ["Toggle Nametag Display", sequence];
};
