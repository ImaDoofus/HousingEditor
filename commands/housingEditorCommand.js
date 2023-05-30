import Settings from "../utils/config";

const housingEditorCommand = register(
  "command",
  ...(args) => {
    let command;
    try {
      command = args[0].toLowerCase();
    } catch (e) {
      args = ["help", 1];
      command = "help";
    }

    if (command === "help") {
      let page = parseInt(args[1]);
      if (isNaN(page)) page = 1;
      if (page === 1) {
        ChatLib.chat(`&6-----------------------------------------------------`);
        ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (1/3)"));
        ChatLib.chat(ChatLib.getCenteredText("&7Basic HousingEditor Commands"));
        ChatLib.chat("");
        ChatLib.chat("&6/housingeditor help <page> &fView all the HousingEditor commands.");
        ChatLib.chat("&6/housingeditor config &fOpen HousingEditor the configuration GUI.");
        ChatLib.chat("&6/linkaccount <code> &fLinks your account to the website.");
        ChatLib.chat("&6/loaditem <id> &fLoads an item from the website.");
        ChatLib.chat("&6/selfstat <stat> <set/inc/dec> <value> &fViews/Sets your stats.");
        ChatLib.chat("&6/location &fTells you your current location for copying.");
        ChatLib.chat(
          "&6/npclist &fReturns a list of NPCs and their coordinates. (Note: Will only detect NPCs within your render distance!)"
        );
        ChatLib.chat("&7&oNext Page: HousingEditor Pro Tool Commands");
        ChatLib.chat("");
        ChatLib.chat(`&6-----------------------------------------------------`);
      } else if (page === 2) {
        ChatLib.chat(`&6-----------------------------------------------------`);
        ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (2/3)"));
        ChatLib.chat(ChatLib.getCenteredText("&7Pro Tool Commands"));
        ChatLib.chat("");
        ChatLib.chat("&6//protools (/pt) &fGives you protools (can customize in config file).");
        ChatLib.chat("&6//up <height> &fTeleports you on y-axis emit <height> to tp to housing max build height.");
        ChatLib.chat("&6//tppos1 //tppos2 &fTeleports you to protool selection 1 or 2.");
        ChatLib.chat("&7&oNext Page: Item Manipulation Commands");
        ChatLib.chat("");
        ChatLib.chat(`&6-----------------------------------------------------`);
      } else if (page === 3) {
        ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (3/3)"));
        ChatLib.chat(ChatLib.getCenteredText("&7Item Manipulation Commands"));
        ChatLib.chat("");
        ChatLib.chat("&6/item <command/help> &c(WIP) &fMain command which covers all HousingEditor item utilties.");
        ChatLib.chat("&6/nbt &fDisplays the NBT of your held item in chat.");
        ChatLib.chat("&6/unbreakable <true/false> (/ub) &fToggles whether or not an item is unbreakable.");
        ChatLib.chat(
          "&6/hideflags <true/false> <value> (/hf) &fToggles the visibility of an item's flags, the value parameter is an optional byte which will allow you to hide specific flags"
        );
        ChatLib.chat(
          "&6/lore <add/set/remove/list/clear> &fManipulate the lore of your held item. (Use /lore help for more information)"
        );
        ChatLib.chat("&6/rename <text> &fRename your held item.");
        ChatLib.chat("&6/actionpad (/ap) &fAutomatically recieve an actionpad into your selected hotbar slot.");
        ChatLib.chat("&6/hologram (/hg) &fAutomatically recieve a hologram into your selected hotbar slot.");
        ChatLib.chat("&6/npc &fAutomatically recieve a NPC item into your selected hotbar slot.");
        ChatLib.chat("&6/wear <head/chest/legs/feet> &fWear your held item on the selected slot.");
        ChatLib.chat("&6/count <amount> (/stack) &fSets the amount of items in your held item.");
        ChatLib.chat("&6/material <material> (/mat) &fSets the material of your held item.");
        ChatLib.chat("&6/damage <damage> (/metadata) &fSets the damage value  of your held item.");
        ChatLib.chat("&6/enchantall <level> (/ea) &fAdd every enchantment with the specified level to your held item");
        ChatLib.chat("");
        ChatLib.chat(`&6-----------------------------------------------------`);
      } else {
        ChatLib.chat("&cInvalid Page Number.");
      }
      return;
    }

    if (command === "config") return Settings.openGUI();

    ChatLib.chat("&cInvalid HousingEditor Command. Type /housingeditor help for a list of commands.");
  }
);

housingEditorCommand.setTabCompletions((args) => {
  if (args.length === 1) return ["help", "config"];
  return [];
});

housingEditorCommand.setName("housingeditor").setAliases(["he"]);

// NPC List Command
register("command", () => {
  if (!TabList.getFooter().includes("You are in "))
    return ChatLib.chat("&cYou must be in a housing to use this command!");
  let NPCs = [];

  // Collect all NPCs in your world as objects
  World.getAllPlayers().forEach((p) => {
    if (p.getUUID().version() === 2 && p.getName() !== "Carpenter ") {
      NPCs.push(p);
    }
  });

  if (NPCs.length === 0) return ChatLib.chat("&cThere are no NPCs either in your render distance!");
  let NPCListMsg = new Message(`&7NPC List &b(${NPCs.length})\n`);

  // Iterate through the NPC list and add an entry in the chat message that will be sent listing all the NPCs
  for (let x = 0; x < NPCs.length; x++) {
    let p = NPCs[x];
    NPCListMsg.addTextComponent(new TextComponent(`&a${x + 1} &7- `)); // index of NPC
    let dispName = getNPCDisplayName(p);
    if (!dispName) {
      if (cachedNPCNames[p.getName()]) {
        dispName = cachedNPCNames[p.getName()];
      } else {
        dispName = "§cNo Name";
      }
    }
    NPCListMsg.addTextComponent(
      new TextComponent(`&r${dispName}`).setHoverValue(
        `&eDisplay Name: &r${dispName}\n&eEntity Name: &7${p.getName()}\n&eUUID: &7${p.getUUID()}`
      )
    ); // Name of NPC
    NPCListMsg.addTextComponent(new TextComponent(`&7: `));
    NPCListMsg.addTextComponent(
      new TextComponent(`&b${p.getX()}&3, &b${p.getY()}&3, &b${p.getZ()}`)
        .setHoverValue(`&eClick to teleport to NPC`)
        .setClick("run_command", `/tp ${p.getX()} ${p.getY()} ${p.getZ()}`)
    ); // NPC's coordinates
    if (x < NPCs.length - 1) NPCListMsg.addTextComponent(`\n`);
  }
  ChatLib.chat(NPCListMsg);
})
  .setName("npclist")
  .setAliases(["npcl", "npl"]);

// NPC's name is separate hologram so this function will try to get a NPC's display name
function getNPCDisplayName(p, formatted = false) {
  if (!p || p.getUUID().version() !== 2) return;
  let entities = World.getAllEntities();

  let NPCName;
  entities.forEach((entity) => {
    if (entity.getClassName() === "EntityArmorStand") {
      let distance = entity.getEntity().func_70032_d(p.getPlayer()); // distance to NPC
      if (distance === 0.09375) {
        NPCName = entity.getName();
      }
    }
  });
  if (!NPCName || NPCName === "Armor Stand") {
    if (formatted) return "§cNone";
    else return null;
  }
  return NPCName;
}

let cachedNPCNames = {};
// cache NPC names so if a NPC's name hologram is unrendered the client can still display the NPC name if it was previously in render distance
register("tick", () => {
  World.getAllPlayers().forEach((p) => {
    if (!cachedNPCNames[p.getName()]) {
      if (p.getUUID().version() === 2 && p.getName() !== "Carpenter ") {
        let dispName = getNPCDisplayName(p);
        if (dispName) {
          cachedNPCNames[p.getName()] = dispName;
        }
      }
    }
  });
});

register("worldLoad", () => {
  cachedNPCNames = {};
});
