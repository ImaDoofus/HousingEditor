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


// RELATIVE TELEPORTING SUPPORT
function onHousing() {
	return (
		ChatLib.removeFormatting(Scoreboard.getTitle()).includes("HOUSING") && Server.getIP().includes("hypixel.net")
	);
}

function correctTildaFormat(arr) {
	returnValue = false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].startsWith("~")) {
			returnValue = true;
		} else if (arr[i].includes("~")) {
			returnValue = false;
		}
	}
	return returnValue;
}
// Redirects a player's /tp command to the hidden tp tilda command if the certain criteria are met

register("messageSent", (message, event) => {
	if (
		message.toLowerCase().startsWith("/tp") &&
		message.toLowerCase() !== "/tp" &&
		onHousing()
	) {
		cancel(event);
		ChatLib.addToSentMessageHistory(message);
		ChatLib.command(`relativeTP ${message.split(" ").splice(1).join(" ")}`, true);
	}
});

// hidden behind the scenes command, is not meant to be used directly by player
register("command", (...parameters) => {
	slashTPParameters = parameters?.join(" ");
	if (!slashTPParameters) {
		ChatLib.command("tp");
	}
	if (
		parameters[0] === undefined ||
		!correctTildaFormat(parameters) ||
		parameters.length <= 2
	) {
		// Normal /tp implementation
		ChatLib.say(`/tp ${slashTPParameters}`);
	} else {
		// TildaTP Code

		if (parameters.length === 3) {
			// /tp <x> <y> <z>

			parameterInfo = {};
			coordTypes = ["x", "y", "z"];
			coordMethods = [Player.getX(), Player.getY(), Player.getZ()];

			// loop through the coordinate parameters
			for (i = 0; i < parameters.length; i++) {
				if (parameters[i].startsWith("~")) {
					if (parameters[i] !== "~") {
						parameterInfo[coordTypes[i]] =
							parseFloat(parameters[i].replace("~", "")) + coordMethods[i];
					} else {
						parameterInfo[coordTypes[i]] = coordMethods[i];
					}
				} else {
					parameterInfo[coordTypes[i]] = parseFloat(parameters[i]);
				}
			}

			if (
				!isNaN(parameterInfo["x"]) &&
				!isNaN(parameterInfo["y"]) &&
				!isNaN(parameterInfo["z"])
			) {
				ChatLib.say(
					`/tp ${parameterInfo["x"]} ${parameterInfo["y"]} ${parameterInfo["z"]} `
				);
			} else {
				ChatLib.say(`/tp ${slashTPParameters}`);
			}
		} else {
			try {
				// /tp <player> <x> <y> <z>
				parameterInfo = {};
				coordTypes = ["x", "y", "z"];
				PlayerMP = World.getPlayerByName(parameters[0]);
				coordMethods = [PlayerMP.getX(), PlayerMP.getY(), PlayerMP.getZ()];

				parameters.shift();

				// loop through the coordinate parameters
				for (i = 0; i < parameters.length; i++) {
					if (parameters[i].startsWith("~")) {
						if (parameters[i] !== "~") {
							parameterInfo[coordTypes[i]] =
								parseFloat(parameters[i].replace("~", "")) + coordMethods[i];
						} else {
							parameterInfo[coordTypes[i]] = coordMethods[i];
						}
					} else {
						parameterInfo[coordTypes[i]] = parseFloat(parameters[i]);
					}
				}

				if (
					!isNaN(parameterInfo["x"]) &&
					!isNaN(parameterInfo["y"]) &&
					!isNaN(parameterInfo["z"])
				) {
					ChatLib.say(
						`/tp ${PlayerMP.getName()} ${parameterInfo["x"]} ${parameterInfo["y"]
						} ${parameterInfo["z"]} `
					);
				} else {
					ChatLib.say(`/tp ${slashTPParameters}`);
				}
			} catch (error) {
				ChatLib.say(`/tp ${slashTPParameters}`);
			}
		}
	}
}).setName("relativeTP");