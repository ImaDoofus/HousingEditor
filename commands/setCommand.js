import config from '../api/config.js';
import { getTabCompletions, argsToIds } from "../worldedit/blockListUtil.js";
if (config.useBetterWorldedit) {
	const setCommand = register('command', ...args => {
		const ids = argsToIds(args.join(',').split(','));
		ChatLib.command(`hypixelcommand:set ${ids.join(",")}`);
	})
	setCommand.setTabCompletions((args) => {
		return getTabCompletions(args);
	});
	setCommand.setName('set')
	setCommand.setAliases(['/set'])
};
