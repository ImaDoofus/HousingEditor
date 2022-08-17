import config from '../api/config.js';
import { positions } from '../worldedit/selectionAddons.js';
import { getTabCompletions, argsToIds } from "../worldedit/blockListUtil.js";

if (config.useBetterWorldedit) {
	let lastUsed = Date.now();
	let cooldown = 5000;

	register('command', ...args => {
		executeCommand(args, true);
	}).setTabCompletions((args) => {
		return getTabCompletions(args);
	}).setName('cube').setAliases(['/cube'])

	register('command', ...args => {
		executeCommand(args, false);
	}).setTabCompletions((args) => {
		return getTabCompletions(args);
	}).setName('walls').setAliases(['/walls'])

	const getCooldown = () => ((cooldown - (Date.now() - lastUsed)) / 1000).toFixed(1);

	function executeCommand(args, keepTopBottom) {
		if (Date.now() - lastUsed < cooldown) return ChatLib.chat(`&cYou must wait &e${getCooldown()} &cseconds before using this command.`);
		if (positions[0].length === 0) return ChatLib.chat('&cPosition A is not set.');
		if (positions[1].length === 0) return ChatLib.chat('&cPosition B is not set.');
		const [x1, y1, z1] = positions[0];
		const [x2, y2, z2] = positions[1];

		const xSize = Math.abs(x1 - x2);
		const ySize = Math.abs(y1 - y2);
		const zSize = Math.abs(z1 - z2);
		if (xSize < 3 || (!keepTopBottom ? false : ySize < 3) || zSize < 3) return ChatLib.chat('&cThe selection is too small.');

		const selectionVolume = xSize * ySize * zSize;
		const waitTime = selectionVolume > 1000 ? Math.round((selectionVolume / 15 + 200)) : 200;

		const ids = argsToIds(args.join(',').split(','));
		if (ids.length === 0) return ChatLib.chat('&cYou must enter atleast 1 block type.');
		if (ids.length === 1 && ids[0] === '0') return ChatLib.chat('&cYou cannot make a cube with air.');

		lastUsed = Date.now();

		new Thread(() => {
			ChatLib.command(`fill ${ids.join(",")}`);
			Thread.sleep(200);
			ChatLib.command(`tp ${x1 + 1.5} ${y1 + 0.5 + (keepTopBottom ? 1 : 0)} ${z1 + 1.5}`);
			Thread.sleep(200);
			ChatLib.command(`posa`);
			Thread.sleep(200);
			ChatLib.command(`tp ${x2 - 1.5} ${y2 - 0.5 - (keepTopBottom ? 1 : 0)} ${z2 - 1.5}`);
			Thread.sleep(200);
			ChatLib.command(`posb`);
			if (waitTime > 200) ChatLib.chat(`&aWaiting &e${waitTime / 1000}s &afor &e${selectionVolume} &ablocks to be set. Do not move!`);
			Thread.sleep(waitTime);
			ChatLib.command(`replace ${ids.join(",")} air`);
			ChatLib.chat(`&aCreated${keepTopBottom ? ' a' : ''} &e${xSize}x${ySize}x${zSize} &a${keepTopBottom ? 'hollow cube' : 'walls'}.`);
		}).start();
	}

	// dont show default hypixel set pos commands on /cube and /walls
	register('chat', event => {
		const message = ChatLib.getChatMessage(event);
		if (message.match(/Teleporting you to|Position [AB] =/) && Date.now() - lastUsed < cooldown) cancel(event);
	})
};

