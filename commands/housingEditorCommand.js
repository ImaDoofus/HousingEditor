import Settings from "../utils/config";

const housingEditorCommand = register('command', ...args => {
	let command;
	try	{
		command = args[0].toLowerCase();
	} catch(e){
		command = ['help', 1]
	}

	if (command === 'help') {
		let page = parseInt(args[1])
		if (isNaN(page)) page = 1;
		if (page === 1) {
			ChatLib.chat(`&6-----------------------------------------------------`);
			ChatLib.chat(ChatLib.getCenteredText("&6HousingEditor Commands (1/3)"))
			ChatLib.chat(ChatLib.getCenteredText('&7Basic HousingEditor Commands'))
			ChatLib.chat('')
			ChatLib.chat('&6/housingeditor help <page> &fView all the HousingEditor commands.')
			ChatLib.chat('&6/housingeditor config &fOpen HousingEditor the configuration GUI.')
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
			ChatLib.chat('&6/actionpad (/ap) &fAutomatically recieve an actionpad into your selected hotbar slot.')
			ChatLib.chat('&6/hologram (/hg) &fAutomatically recieve a hologram into your selected hotbar slot.')
			ChatLib.chat('')
			ChatLib.chat(`&6-----------------------------------------------------`);
		} else {
			ChatLib.chat("&cInvalid Page Number.");
		}
		return;
	}

	if (command === 'config') return Settings.openGUI();

	ChatLib.chat("&cInvalid HousingEditor Command. Type /housingeditor help for a list of commands.");
})

housingEditorCommand.setTabCompletions((args) => {
	if (args.length === 1) return ['help', 'config'];
	return [];
})

housingEditorCommand.setName('housingeditor').setAliases(["he"])
