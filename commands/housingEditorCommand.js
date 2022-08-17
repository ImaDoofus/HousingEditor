import { editConfig } from '../api/config.js';
import config from '../api/config.js';
//import Settings from "../config";

const housingEditorCommand = register('command', ...args => {
	if (!args) args = ['help'];

	let command = args[0];
	
	if (command === 'help') {
		let page = parseInt(args[1])
		if (isNaN(page)) page = 1;
		if (page === 1) {
			ChatLib.chat(`&6-----------------------------------------------------`);
			ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (1/3)"))
			ChatLib.chat(ChatLib.getCenteredText('&7Basic HousingEditor Commands'))
			ChatLib.chat('')
			ChatLib.chat('&6/housingeditor help <page> &fView all the HousingEditor commands.')
			ChatLib.chat('&6/housingeditor config &fOpen the configuration menu.')
			ChatLib.chat('&6/linkaccount <code> &fLinks your account to the website.')
			ChatLib.chat('&6/loaditem <id> &fLoads an item from the website.')
			ChatLib.chat('&6/selfstat <stat> <set/inc/dec> <value> &fViews/Sets your stats.')
			ChatLib.chat('&6/location &fTells you your current location for copying.')
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
			ChatLib.chat('&6/nbt &fCopies the NBT data of your held item to the clipboard.')
			ChatLib.chat('&6/unbreakable (/ub) &fToggles whether or not an item is unbreakable.')
			ChatLib.chat("&6/hideflags <value> (/hf) &fToggles the visibility of an item's flags, the value parameter is an optional byte which will allow you to hide specific flags")
			ChatLib.chat('&6/lore <add/set/remove/list/clear> &fManipulate the lore of your held item. (Use /lore help for more information)')
			ChatLib.chat('&6/rename <text> &fRename your held item.')
			ChatLib.chat('')
			ChatLib.chat(`&6-----------------------------------------------------`);
		} else {
			ChatLib.chat("&cInvalid Page Number.");
		}
	}

	//if (command === 'config') Settings.openGUI();

	if (command === 'safemode') {
		config.useSafeMode = !config.useSafeMode;
		editConfig('useSafeMode', config.useSafeMode);
		ChatLib.chat(`${config.chatPrefix} &6Changed safe mode to ${config.useSafeMode ? '&aenabled' : '&cdisabled'} &6in the config.`);
		ChatLib.chat(`${config.chatPrefix} &6Use &c/housingeditor reload &6to reload the config.`);
	}
})

housingEditorCommand.setTabCompletions((args) => {
	if (args.length === 1) return ['help', 'reload', 'safemode'];
	return [];
})

housingEditorCommand.setName('housingeditor')
