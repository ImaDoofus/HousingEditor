import Settings from "../utils/config";

const commandUsage = [
  "/actionpad (/ap) &fAutomatically recieve an actionpad into your selected hotbar slot.",
  "/count <amount> (/stack) &fSets the amount of items in your held item.",
  "/damage <damage> (/metadata) &fSets the damage value  of your held item.",
  "/datavalue <value> (/dv) &fSets the data value of your held item.",
  "/enchantall <level> (/ea) &fAdd every enchantment with the specified level to your held item",
  "/hideflags <true/false> <value> (/hf) &fToggles the visibility of an item's flags, the value parameter is an optional byte which will allow you to hide specific flags",
  "/hologram (/hg) &fAutomatically recieve a hologram into your selected hotbar slot.",
  "/housingeditor config &fOpen HousingEditor config",
  "/housingeditor help <page> &fList HousingEditor commands.",
  "/item <command/help> &c(WIP) &fMain command which covers all HousingEditor item utilties.",
  "/linkaccount <code> &fLinks your account to the website.",
  "/loaditem <id> &fLoads an item from the website.",
  "/location &fTells you your current location for copying.",
  "/lore <add/set/remove/list/clear> &fManipulate the lore of your held item. (Use /lore help for more information)",
  "/material <material> (/mat) &fSets the material of your held item.",
  "/nbt &fDisplays the NBT of your held item in chat.",
  "/npc &fAutomatically recieve a NPC item into your selected hotbar slot.",
  "/npclist &fShows a list of NPCs and their coordinates within your render distance!",
  "/protools (/pt) &fGives you protools (can customize in config file).",
  "/rename <text> &fRename your held item.",
  "/selfstat <stat> <set/inc/dec> <value> &fViews/Sets your stats.",
  "/sixside &fConverts your held item to a six-sided variant.",
  "/tppos1 /tppos2 &fTeleports you to protool selection 1 or 2.",
  "/unbreakable <true/false> (/ub) &fToggles whether or not an item is unbreakable.",
  "/up <height> &fTeleports you on y-axis emit <height> to tp to housing max build height.",
  "/wear <head/chest/legs/feet> &fWear your held item on the selected slot.",
];
const pageLength = 8;
const maxPages = Math.ceil(commandUsage.length / pageLength);

const housingEditorCommand = register("command", (...args) => {
  const subcommand = args?.[0];
  if (subcommand === "help") {
    let page = parseInt(args[1]) || 1;
    if (page > maxPages) return ChatLib.chat(`&cInvalid page number. There are only ${maxPages} pages.`);
    let helpMsg = new Message(`&6HousingEditor Commands &b(Page ${page}/${maxPages})\n`);
    helpMsg.addTextComponent("&6&m" + ChatLib.getChatBreak("-"));
    let start = (page - 1) * pageLength;
    for (let i = start; i < start + pageLength; i++) {
      let cmd = commandUsage[i];
      if (!cmd) break;
      helpMsg.addTextComponent(new TextComponent(`&6${cmd}\n`));
    }
    ChatLib.chat(helpMsg);
  } else if (subcommand === "config") Settings.openGUI();
  else ChatLib.chat(`&cInvalid argument "${subcommand}". Type /housingeditor help for a list of commands.`);
});

housingEditorCommand.setTabCompletions((args) => {
  if (args.length === 1) return ["help", "config"];
  return [];
});

housingEditorCommand.setName("housingeditor").setAliases(["he"]);
