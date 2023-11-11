import getEnchantment from "../../utils/getEnchantment";

export default (actionData) => {
  let sequence = [];

  if (actionData.enchantment) {
    sequence.push(["click", { slot: 10 }]);
    let { slot, page } = getEnchantment(actionData.enchantment);
    if (page) {
      sequence.push(["click", { slot: 53 }]);
    }
    sequence.push(["click", { slot }]);
  }

  if (actionData.level && actionData.level !== "1") {
    sequence.push(["click", { slot: 11 }]);
    sequence.push(["anvil", { text: actionData.level }]);
  }

  return ["Enchant Held Item", sequence];
};
