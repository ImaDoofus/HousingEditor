import { editConfig } from '../api/config.js';
import config from '../api/config.js';

const housingEditorCommand = register('command', ...args => {
	if (args.length === 0) args[0] = 'help';

	let command = args[0];

	if (command === 'help') {
		ChatLib.chat(`&6------------ Housing Editor Commands ------------`);
		ChatLib.chat('&6//protools &fGives you protools (can customize in config file).')
		ChatLib.chat('&6/selfstat <stat> <set/inc/dec> <value> &fViews/Sets your stats.')
		ChatLib.chat('&6/linkaccount <code> &fLinks your account to the website.')
		ChatLib.chat('&6/loaditem <id> &fLoads an item from the website.')
		ChatLib.chat('&6/location &fTells you your current location for copying.')
		ChatLib.chat('&6//cube <blocks> &fMakes a hollow cube from your selection.')
		ChatLib.chat('&6//walls <blocks> &fMakes walls from your selection.')
		ChatLib.chat('&6//up <height> &fTeleports you on y-axis emit <height> to tp to housing max build height.')
		ChatLib.chat('&6//tppos1 //tppos2 &fTeleports you to protool selection 1 or 2.')
		ChatLib.chat('&6/housingeditor <help/reload/safemode> &fHousing editor commands.')
		ChatLib.chat(`&6-------------------------------------------------`);
	}

	if (command === 'reload') ChatTriggers.loadCT();

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