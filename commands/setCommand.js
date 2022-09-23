import Settings from '../utils/config';
import { getTabCompletions, argsToIds } from "../worldedit/blockListUtil";
if (Settings.useBetterWorldedit) {
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
