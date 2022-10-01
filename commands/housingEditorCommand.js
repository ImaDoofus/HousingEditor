import { editConfig } from '../api/config';
import config from '../api/config';
import Settings from "../config";

const housingEditorCommand = register('command', ...args => {
	let command;
	if (!args[0]) args = ['help', 1];

	command = args[0].toLowerCase();

	if (command === 'help') {
		let page = parseInt(args[1])
		if (isNaN(page)) page = 1;
		if (page === 1) {
			ChatLib.chat(`&6-----------------------------------------------------`);
			ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (1/3)"))
			ChatLib.chat(ChatLib.getCenteredText('&7Basic HousingEditor Commands'))
			ChatLib.chat('')
			ChatLib.chat('&6/housingeditor help <page> (/he) &fView all the HousingEditor commands.')
			ChatLib.chat('&6/housingeditor config &fOpen HousingEditor the configuration GUI.')
			ChatLib.chat('&6/linkaccount <code> &fLinks your account to the website.')
			ChatLib.chat('&6/loaditem <id> &fLoads an item from the website.')
			ChatLib.chat('&6/selfstat <stat> <set/inc/dec> <value> &fViews/Sets your stats.')
			ChatLib.chat('&6/location (/loc) &fTells you your current location for copying.')
			ChatLib.chat('&7&oNext Page: HousingEditor Pro Tool Commands')
			ChatLib.chat('')
			ChatLib.chat(`&6-----------------------------------------------------`);
		} else if (page === 2) {
			ChatLib.chat(`&6-----------------------------------------------------`);
			ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (2/3)"))
			ChatLib.chat(ChatLib.getCenteredText('&7Pro Tool Commands'))
			ChatLib.chat('')
			ChatLib.chat('&6//protools (/pt) &fGives you protools (can customize in config file).')
			ChatLib.chat('&6//cube <blocks> &fMakes a hollow cube from your selection.')
			ChatLib.chat('&6//walls <blocks> &fMakes walls from your selection.')
			ChatLib.chat('&6//up <height> &fTeleports you on y-axis emit <height> to tp to housing max build height.')
			ChatLib.chat('&6//tppos1 //tppos2 &fTeleports you to protool selection 1 or 2.')
			ChatLib.chat('&7&oNext Page: Item Manipulation Commands')
			ChatLib.chat('')
			ChatLib.chat(`&6-----------------------------------------------------`);
		} else if (page === 3) {
			ChatLib.chat(`&6-----------------------------------------------------`);
			ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (3/3)"))
			ChatLib.chat(ChatLib.getCenteredText('&7Item Manipulation Commands'))
			ChatLib.chat('')
			ChatLib.chat('&6/item <command/help> &c(WIP) &fMain command which covers all HousingEditor item utilties.')
			ChatLib.chat('&6/nbt &fDisplays the NBT of your held item in chat.')
			ChatLib.chat('&6/unbreakable <true/false> (/ub) &fToggles whether or not an item is unbreakable.')
			ChatLib.chat("&6/hideflags <true/false> <value> (/hf) &fToggles the visibility of an item's flags, the value parameter is an optional byte which will allow you to hide specific flags")
			ChatLib.chat('&6/lore <add/set/remove/list/clear> &fManipulate the lore of your held item. (Use /lore help for more information)')
			ChatLib.chat('&6/rename <text> &fRename your held item.')
			ChatLib.chat('&6/actionpad (/ap) &fAutomatically recieve an actionpad into your selected hotbar slot.')
			ChatLib.chat('&6/hologram (/hg) &fAutomatically recieve a hologram into your selected hotbar slot.')
			ChatLib.chat('&6/npc &fAutomatically recieve a NPC item into your selected hot bar slot.
			ChatLib.chat('&6/wear <head/chest/legs/feet> &fWear your held item on the selected slot.')
			ChatLib.chat('&6/count <amount> (/stack) &fSets the amount of items in your held item.')
			ChatLib.chat("&6/material <material> (/mat) &fSets the material of your held item.")
			ChatLib.chat("&6/damage <damage> (/metadata) &fSets the damage value  of your held item.")
			ChatLib.chat("&6/enchantall <level> (/ea) &fAdd every enchantment with the specified level to your held item")
			ChatLib.chat('')
			ChatLib.chat(`&6-----------------------------------------------------`);
		} else {
			ChatLib.chat("&cInvalid Page Number.");
		}
	}

	if (command === 'config') Settings.openGUI();

	if (command === 'safemode') {
		config.useSafeMode = !config.useSafeMode;
		editConfig('useSafeMode', config.useSafeMode);
		ChatLib.chat(`${config.chatPrefix} &6Changed safe mode to ${config.useSafeMode ? '&aenabled' : '&cdisabled'} &6in the config.`);
		ChatLib.chat(`${config.chatPrefix} &6Use &c/housingeditor reload &6to reload the config.`);
	}
})

housingEditorCommand.setTabCompletions((args) => {
	if (args.length === 1) return ['help', 'config'];
	return [];
})

housingEditorCommand.setName('housingeditor').setAliases(["he"])
