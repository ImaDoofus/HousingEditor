export default (actionData) => {
  let sequence = [];

  if (actionData.item) {
    sequence.push(["click", { slot: 10 }]);
    sequence.push(["item", { item: actionData.item }]); // slot 36 is the first slot in the hotbar
  }

  if (actionData.location) {
    sequence.push(["click", { slot: 11 }]);

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
  }

  if (!actionData.dropNaturally) {
    sequence.push(["click", { slot: 12 }]);
  }

  if (actionData.disableItemMerging) {
    sequence.push(["click", { slot: 13 }]);
  }

  if (actionData.prioritizePlayer) {
    sequence.push(["click", { slot: 14 }]);
  }

  if (actionData.fallbackToInventory) {
    sequence.push(["click", { slot: 15 }]);
  }
  return ["Drop Item", sequence];
};
