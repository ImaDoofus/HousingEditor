import config from '../api/config.js';
import { realPositions } from '../worldedit/selectionAddons.js';
if (config.useBetterWorldedit) {
	register('command', () => {
		if (realPositions[0].length === 0) return ChatLib.chat('&cPosition A is not set.');
		const [x, y, z] = realPositions[0];
		ChatLib.command(`tp ${x} ${y} ${z}`);
	}).setName('tpposa').setAliases(['tppos1', '/tpposa', '/tppos1']);
	
	register('command', () => {
		if (realPositions[1].length === 0) return ChatLib.chat('&cPosition B is not set.');
		const [x, y, z] = realPositions[1];
		ChatLib.command(`tp ${x} ${y} ${z}`);
	}).setName('tpposb').setAliases(['tppos2', '/tpposb', '/tppos2']);
};

const teleportCommand = register('command', ...args => {
	if (!args) {
		ChatLib.chat('&cInvalid Usage:');
		ChatLib.chat('   &c>> /teleport <player1> <player2>');
		ChatLib.chat('   &c>> /teleport <player> <x> <y> <z>');
		ChatLib.chat('   &c>> /teleport <x> <y> <z>');
		ChatLib.chat('   &c>> You can put &f~ &cbefore a number for a relative position.');
		return;
	}

	let player = Player.asPlayerMP();
	let player2 = Player.asPlayerMP();
	if (!args[0].match(/^~?-?(\d*\.)?(\d+)?$/)) { // if first arg is a player name
		player = World.getAllPlayers().find(player => player.getName().toLowerCase() === args[0].toLowerCase());
		if (!player) return ChatLib.chat(`&cPlayer ${args[0]} not found.`);
		player2 = player;
		args.shift();
	}
	if (args[0] && !args[0].match(/^~?-?(\d*\.)?(\d+)?$/)) { // if there is a second arg & it is a player name
		player2 = World.getAllPlayers().find(player => player.getName().toLowerCase() === args[0].toLowerCase());
		if (!player2) return ChatLib.chat(`&cPlayer ${args[0]} not found.`);
		if (player.getName() === player2.getName()) return ChatLib.chat('&cYou cannot teleport a player to themselves.');
		return ChatLib.command(`hypixelcommand:tp ${player.getName()} ${player2.getName()}`);
	}

	let [x, y, z] = args;
	if ((!x || !y || !z) && player.getName() !== Player.getName()) return ChatLib.command(`hypixelcommand:tp ${player.getName()}`);
	if (!x) x = player2.getX();
	if (!y) y = player2.getY();
	if (!z) z = player2.getZ();
	if (x[0] === '~') x = player2.getX() + (parseFloat(x.substring(1)) || 0);
	if (y[0] === '~') y = player2.getY() + (parseFloat(y.substring(1)) || 0);
	if (z[0] === '~') z = player2.getZ() + (parseFloat(z.substring(1)) || 0);
	console.log(`hypixelcommand:tp ${player.getName()} ${x} ${y} ${z}`);
	ChatLib.command(`hypixelcommand:tp ${player.getName()} ${x} ${y} ${z}`);
})

teleportCommand.setTabCompletions(args => {
	return getTabCompletions(args);
})
teleportCommand.setName('tp')
teleportCommand.setAliases(['teleport']);

function getTabCompletions(args) {
	if (args.length === 1) {
		return getPlayerNames(args[1]);
	};
	if (args.length === 2) {
		if (!args[1].match(/^~?-?(\d*\.)?(\d+)?$/)) return getPlayerNames(args[1]);
		return [Player.getX().toPrecision(3)];
	}
	if (args.length === 3) return [Player.getY().toPrecision(3)];
	if (args.length === 4) return [Player.getZ().toPrecision(3)];
	return [];
}

function getPlayerNames(arg) {
	const filtered = World.getAllPlayers().filter(player => player.getUUID().version() === 4);
	const playerNames = filtered.map(player => player.getName());
	const filtered2 = playerNames.filter(player => player.startsWith(arg));
	return filtered2;
}