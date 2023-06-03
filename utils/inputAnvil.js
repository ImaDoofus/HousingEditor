const outputSlotField = Java.type("net.minecraft.inventory.ContainerRepair").class.getDeclaredField("field_82852_f");
outputSlotField.setAccessible(true);

const outputSlotItemField = Java.type("net.minecraft.inventory.InventoryCraftResult").class.getDeclaredField("field_70467_a");
outputSlotItemField.setAccessible(true);

export default (input) => {
  if (Client.currentGui.getClassName() === "GuiRepair") {
    let outputSlot = outputSlotField.get(Player.getContainer().container); // outputSlot is a net.minecraft.inventory.InventoryCraftResult
    let outputSlotItem = outputSlotItemField.get(outputSlot); // array with one item, net.minecraft.item.ItemStack

    outputSlotItem[0] = new Item(339).setName(input).itemStack; // set the single item in the array an item with the name of the input

    outputSlotItemField.set(outputSlot, outputSlotItem); // actually set the outputSlot in the anvil to the new item

    Player.getContainer().click(2);
  }
};
