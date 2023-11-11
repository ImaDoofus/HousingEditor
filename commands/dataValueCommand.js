import loadItemstack from "../utils/loadItemstack";

register("command", (dataValue) => {
  if (!dataValue) return ChatLib.chat("&cPlease specify a data value.");
  if (Player.asPlayerMP().player.field_71075_bZ.field_75098_d === false) return ChatLib.chat("&cYou must be in creative mode to use this command.");
  let item = Player.getHeldItem();
  if (!item) return ChatLib.chat("&cPlease make sure your hand is not empty.");
  if (isNaN(parseInt(dataValue))) return ChatLib.chat("&cPlease specify a valid data value.");
  loadItemstack(item.setLore([`§7Data Value: ${dataValue}`]).itemStack, Player.getHeldItemIndex() + 36);
  ChatLib.chat("&aSuccessfully updated data value.");
})
  .setName("datavalue")
  .setAliases(["dv"]);
