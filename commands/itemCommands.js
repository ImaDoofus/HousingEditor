import getItemFromNBT from "../utils/getItemFromNBT";
import loadItemstack from "../utils/loadItemstack";
import Settings from "../utils/config.js";

let currentItemNBT = "";

function isCreative() {
  return Player.asPlayerMP().player.field_71075_bZ.field_75098_d;
}

function getItemLore(item) {
  let lore = [];
  try {
    if (item.getNBT()?.getTag("tag")?.getTag("display").get("Lore"))
      lore = item.getNBT().toObject()["tag"]["display"]["Lore"];
    return lore;
  } catch (e) {
    return [];
  }
}

register("command", () => {
  if (Player.getHeldItem()) {
    var itemNBT = new Message(
      new TextComponent(
        "\n&bHeld Item NBT &3&l(&3Click to Copy&3&l)\n\n" +
          JSON.stringify(Player.getHeldItem().getNBT().toObject(), null, 4) +
          "\n"
      )
        .setHoverValue("&eClick to copy")
        .setClick("run_command", `/copy-nbt`)
    );
    currentItemNBT = Player.getHeldItem().getRawNBT();
    ChatLib.chat(itemNBT);
  } else {
    ChatLib.chat(`&cYou must be holding an item to use this command.`);
  }
}).setName("nbt");

register("command", () => {
  ChatLib.command(`ct copy ${currentItemNBT}`, true);
  ChatLib.chat(`${Settings.chatPrefix}&r &aCopied NBT to clipboard.`);
}).setName("copy-nbt");

NBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
NBTTagList = Java.type("net.minecraft.nbt.NBTTagList");

function setHeldItemTag(key, value) {
  new_nbt = new NBTTagCompound();
  new_nbt.func_74774_a(key, value);
  loadItemstack(
    getItemFromNBT(Player.getHeldItem().getItemNBT().setNBTBase("tag", new_nbt))
      .itemStack,
    Player.getHeldItemIndex() + 36
  );
}

register("command", (boolean = null) => {
  boolean = { true: true, false: false }[boolean?.toLowerCase()];
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  if (
    (!Player.getHeldItem().getNBT().getTag("tag")?.getByte("Unbreakable") &&
      boolean !== false) ||
    boolean === true
  ) {
    if (!Player.getHeldItem().getNBT().getTag("tag")) {
      setHeldItemTag("Unbreakable", 1);
    } else {
      Player.getHeldItem().getItemNBT().getTag("tag").setByte("Unbreakable", 1);
    }
    ChatLib.chat(`${Settings.chatPrefix}&r &aItem is now unbreakable.`);
  } else {
    if (Player.getHeldItem().getNBT().getTag("tag")) {
      Player.getHeldItem().getItemNBT().getTag("tag").setByte("Unbreakable", 0);
    }
    ChatLib.chat(`${Settings.chatPrefix}&r &aItem is now breakable.`);
  }
})
  .setName("unbreakable")
  .setAliases(["ub"]);

register("command", (boolean = null, value = 127) => {
  boolean = { true: true, false: false }[boolean?.toLowerCase()];
  if (value < -128 || value > 127 || isNaN(value))
    return ChatLib.chat("&cInvalid custom HideFlag value, must be a byte.");
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  if (
    (!Player.getHeldItem().getNBT().getTag("tag")?.getByte("HideFlags") &&
      boolean !== false) ||
    boolean === true
  ) {
    if (!Player.getHeldItem().getNBT().getTag("tag")) {
      setHeldItemTag("HideFlags", parseInt(value));
    } else {
      Player.getHeldItem()
        .getItemNBT()
        .getTag("tag")
        .setByte("HideFlags", parseInt(value));
    }
    ChatLib.chat(`${Settings.chatPrefix}&r &aItem flags hidden.`);
  } else {
    if (Player.getHeldItem().getNBT().getTag("tag")) {
      Player.getHeldItem().getItemNBT().getTag("tag").setByte("HideFlags", 0);
    }
    ChatLib.chat(`${Settings.chatPrefix}&r &aAll item flags are now visible.`);
  }
})
  .setName("hideflags")
  .setAliases(["hf"]);

register("command", (mode, ...params) => {
  let item = Player.getHeldItem();
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!item)
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  mode = mode?.toLowerCase();
  lore = getItemLore(item);
  let text;
  let newLore;
  switch (mode) {
    case "add":
      if (lore.length >= 50)
        return ChatLib.chat(
          "&cCannot add anymore lore to this item due to Hypixel Housing limitations."
        );
      text = params.join(" ");
      if (!text) return ChatLib.chat("&cInvalid Usage: /lore add <text>");
      lore.push(text);
      loadItemstack(
        item.setLore(lore).itemStack,
        Player.getHeldItemIndex() + 36
      );
      ChatLib.chat(`${Settings.chatPrefix}&r &aAdded lore to item.`);
      break;
    case "clear":
      loadItemstack(item.setLore([]).itemStack, Player.getHeldItemIndex() + 36);
      ChatLib.chat(`${Settings.chatPrefix}&r &aCleared lore from item.`);
      break;
    case "list":
      if (lore.length > 0) {
        ChatLib.chat(`&r${item.getName()}&r&7's Lore:`);
        for (let i = 0; i < lore.length; i++) {
          ChatLib.chat(`&a${i + 1} &7- &r&5&o${lore[i]}`);
        }
      } else {
        ChatLib.chat("&cThis item has no lore.");
      }
      break;
    case "set":
      index = parseInt(params[0]);
      text = params.slice(1).join(" ");
      if (isNaN(index) || !text)
        return ChatLib.chat("&cInvalid Usage: /lore set <index> <text>");
      if (index < 1 || index > lore.length)
        return ChatLib.chat(
          "&cSpecified line index is out of the item's range."
        );
      newLore = lore;
      newLore[index - 1] = text;
      loadItemstack(item.setLore(newLore), Player.getHeldItemIndex() + 36);
      ChatLib.chat(
        `${Settings.chatPrefix}&r &aLore line successfully updated.`
      );
      break;
    case "remove":
      index = parseInt(params[0]);
      if (isNaN(index))
        return ChatLib.chat("&cInvalid Usage: /lore remove <index>");
      if (index < 1 || index > lore.length)
        return ChatLib.chat(
          "&cSpecified line index is out of the item's range."
        );
      newLore = lore;
      newLore.splice(index - 1, 1);
      loadItemstack(item.setLore(newLore), Player.getHeldItemIndex() + 36);
      ChatLib.chat(
        `${Settings.chatPrefix}&r &aLore line successfully removed.`
      );
      break;
    case "insert":
      index = parseInt(params[0]);
      if (isNaN(index))
        return ChatLib.chat("&cInvalid Usage: /lore insert <index> <text>");
      if (index < 1 || index > lore.length + 1)
        return ChatLib.chat(
          "&cSpecified line index is out of the item's range."
        );
      if (lore.length >= 50)
        return ChatLib.chat(
          "&cCannot add anymore lore to this item due to Hypixel Housing limitations."
        );
      text = params?.slice(1)?.join(" ");
      if (!text)
        return ChatLib.chat("&cInvalid Usage: /lore insert <index> <text>");
      newLore = lore;
      newLore.splice(index - 1, 0, text);
      loadItemstack(item.setLore(newLore), Player.getHeldItemIndex() + 36);
      ChatLib.chat(
        `${Settings.chatPrefix}&r &aInserted lore line at line ${index} of held item.`
      );
      break;
    default:
      ChatLib.chat("&6Usage:");
      ChatLib.chat("/lore set <line index> [text]");
      ChatLib.chat("/lore insert <line index> [text]");
      ChatLib.chat("/lore add <text>");
      ChatLib.chat("/lore remove <line index>");
      ChatLib.chat("/lore list");
      ChatLib.chat("/lore clear");
  }
}).setName("lore");

register("command", (...text) => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  if (!text) return ChatLib.chat("&cInvalid Usage: /rename <text>");
  text = text.join(" ");
  loadItemstack(
    Player.getHeldItem().setName(text).itemStack,
    Player.getHeldItemIndex() + 36
  );
  ChatLib.chat(`${Settings.chatPrefix}&r &aRenamed item.`);
}).setName("rename");

register("command", () => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (Player.getHeldItemIndex() === 8)
    return ChatLib.chat("&cThis slot is already in use.");
  loadItemstack(
    getItemFromNBT(
      '{id:"minecraft:heavy_weighted_pressure_plate",Count:1b,tag:{display:{Lore:[0:"§7Place this block in your house",1:"§7to place an Action Pad!"],Name:"§aAction Pad"}},Damage:0s}'
    ).itemStack,
    Player.getHeldItemIndex() + 36
  );
  ChatLib.chat(`${Settings.chatPrefix}&r &aGave you an action pad!`);
  World.playSound("random.pop", 0.2, 2);
})
  .setName("actionpad")
  .setAliases(["ap"]);

register("command", () => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (Player.getHeldItemIndex() === 8)
    return ChatLib.chat("&cThis slot is already in use.");
  loadItemstack(
    getItemFromNBT(
      '{id:"minecraft:name_tag",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house to",1:"§7place a Hologram!"],Name:"§aHologram"}},Damage:0s}'
    ).itemStack,
    Player.getHeldItemIndex() + 36
  );
  ChatLib.chat(`${Settings.chatPrefix}&r &aGave you a hologram!`);
  World.playSound("random.pop", 0.2, 2);
})
  .setName("hologram")
  .setAliases(["hg"]);

register("command", () => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (Player.getHeldItemIndex() === 8)
    return ChatLib.chat("&cThis slot is already in use.");
  loadItemstack(
    getItemFromNBT(
      '{id:"minecraft:skull",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house to",1:"§7place an NPC!"],Name:"§aNPC"}},Damage:3s}'
    ).itemStack,
    Player.getHeldItemIndex() + 36
  );
  ChatLib.chat(`${Settings.chatPrefix}&r &aGave you an NPC item!`);
  World.playSound("random.pop", 0.2, 2);
}).setName("npc");

register("command", (amount = 64) => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  if (!amount) return ChatLib.chat("&cInvalid Usage: /amount <amount>");
  amount = parseInt(amount);
  if (isNaN(amount)) return ChatLib.chat("&cInvalid Usage: /amount <amount>");
  if (amount < 1 || amount > 64)
    return ChatLib.chat("&cInvalid Item Amount: Must be between 1 and 64.");
  loadItemstack(
    Player.getHeldItem().setStackSize(amount).itemStack,
    Player.getHeldItemIndex() + 36
  );
  ChatLib.chat(`${Settings.chatPrefix}&r &aSet item amount to ${amount}.`);
})
  .setName("count")
  .setAliases(["stack"]);

register("command", (damage) => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  if (!damage) return ChatLib.chat("&cInvalid Usage: /damage <damage>");
  amount = parseInt(damage);
  if (isNaN(amount)) return ChatLib.chat("&cInvalid Usage: /damage <damage>");
  if (amount < 0 || amount > 32767)
    return ChatLib.chat("&cInvalid Item Damage: Must be between 0 and 32767.");
  loadItemstack(
    Player.getHeldItem().setDamage(damage).itemStack,
    Player.getHeldItemIndex() + 36
  );
  ChatLib.chat(`${Settings.chatPrefix}&r &aSet item damage to ${damage}.`);
}).setName("damage").setAliases["metadata"];

register("command", (mat) => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  if (!mat) return ChatLib.chat("&cInvalid Usage: /material <material>");
  try {
    loadItemstack(
      getItemFromNBT(
        Player.getHeldItem()
          .getNBT()
          .setString("id", mat)
          .setByte("Damage", 0)
          .toString()
      ).itemStack,
      Player.getHeldItemIndex() + 36
    );
    ChatLib.chat(`${Settings.chatPrefix}&r &aSet item material to ${mat}.`);
  } catch (e) {
    ChatLib.chat(
      "&cError changing item material, was the entered value a real item?"
    );
  }
})
  .setName("material")
  .setAliases("mat");

register("command", (slot) => {
  let slots = {
    head: 5,
    chest: 6,
    legs: 7,
    feet: 8,
  };
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  if (!slot)
    return ChatLib.chat("&cInvalid Usage: /wear <head/chest/legs/feet>");
  slotNum = slots[slot.toLowerCase()];
  if (!slotNum)
    return ChatLib.chat("&cInvalid Usage: /wear <head/chest/legs/feet>");

  loadItemstack(Player.getHeldItem().itemStack, slotNum);
  ChatLib.chat(
    `${Settings.chatPrefix}&r &aEquipped held item to ${slot.toLowerCase()}.`
  );
  World.playSound("random.pop", 0.2, 2);
}).setName("wear");

register("command", (lvl = 10) => {
  if (!isCreative())
    return ChatLib.chat("&cYou must be in creative mode to use this command.");
  if (!Player.getHeldItem())
    return ChatLib.chat(`&cYou must be holding an item to use this command.`);
  lvl = parseInt(lvl);
  if (isNaN(lvl))
    return ChatLib.chat("&cInvalid Usage: /enchantall <enchantment level>");
  if (lvl > 10 || lvl < 1) return ChatLib.chat("&cInvalid number!");

  newItemNBT = Player.getHeldItem().getNBT();
  if (!newItemNBT.getTag("tag")) {
    newItemNBT.setNBTBase("tag", new NBTTagCompound());
  }
  const enchantmentIDs = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 32, 33, 35, 48, 49,
    50, 51, 61, 62, 34,
  ]; // Vanilla enchantment IDs
  let enchantments = new NBTTagList();

  // loop this code for all enchantments
  enchantmentIDs.forEach((enchantID) => {
    let enchantment_nbt = new NBTTagCompound();
    enchantment_nbt.func_74777_a("lvl", lvl);
    enchantment_nbt.func_74777_a("id", enchantID);
    enchantments.func_74742_a(enchantment_nbt);
  });
  newItemNBT.getTag("tag").set("ench", enchantments);

  loadItemstack(
    getItemFromNBT(newItemNBT).itemStack,
    Player.getHeldItemIndex() + 36
  );
  ChatLib.chat(
    `${Settings.chatPrefix}&r &aGave item every enchantment with level ${lvl}.`
  );
})
  .setName("enchantall")
  .setAliases(["ea"]);

// /lore command (done)
// /lore set <line index> [text]
// /lore add <text>
// /lore remove <line index>
// /lore list
// /lore clear
// /nbt command show formatted json (done)
// /rename command (done)
// /count command (done)
// /material command (done)
// /enhant command (use built-in)
// /metadata command (done)
// /wear (done)

// TO DO
// /tag command
// /glow command
// /get command (/i, /give)
