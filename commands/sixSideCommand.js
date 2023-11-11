import loadItemstack from "../utils/loadItemstack";

const variants = {
  "minecraft:stone_slab": { 0: 8, 1: 9 },
  "minecraft:stone_slab2": { 0: 8 },
  "minecraft:log": { 0: 12, 1: 13, 2: 14, 3: 15 },
  "minecraft:log2": { 0: 12, 1: 13 },
};

register("command", () => {
  if (Player.asPlayerMP().player.field_71075_bZ.field_75098_d === false) return ChatLib.chat("&cYou must be in creative mode to use this command.");
  let item = Player.getHeldItem();
  if (!item) return ChatLib.chat("&cPlease make sure your hand is not empty.");

  let variant = variants[item.getRegistryName()];
  if (!variant || !variant[item.getDamage()]) return ChatLib.chat("&cSorry! This item does not a six-sided variant.");

  let dataValue = variant[item.getDamage()];
  loadItemstack(item.setLore([`§7Data Value: ${dataValue}`]).itemStack, Player.getHeldItemIndex() + 36);
  ChatLib.chat("&aSuccessfully converted to six-sided variant.");
})
  .setName("sixside")
  .setAliases(["makesixsided", "sixsided"]);
