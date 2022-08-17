import config from '../api/config.js';

let selectingInAir = false;
let usedTeleport = false;

if (config.useBetterWorldedit) {
	let lastUsed = Date.now();
	let cooldown = 1000;

	register('clicked', (x, y, button, isDown) => {
		if (!isDown) return;
		if (Client.isInGui() || Client.isInChat()) return;
		if (button === 0 || button === 1) { // left or right click
			if (Player.getHeldItem()?.getName()?.includes('Region Selection Tool')) {
				if (Player.lookingAt() instanceof Block) return;
				if (Date.now() - lastUsed < cooldown) return ChatLib.chat(`&cYou must wait &e${getCooldown()}s &cto do that!`);
				lastUsed = Date.now();
				selectingInAir = true;
				ChatLib.command(`pos${button + 1}`)
			} else if (Player.getHeldItem()?.getName() === ('§bTeleportation Tool')) {
				if (Date.now() - lastUsed < cooldown) return ChatLib.chat(`&cYou must wait &e${getCooldown()}s &cto do that!`);
				lastUsed = Date.now();

				// taken from discord
				let hit = Player.getPlayer().func_174822_a(50, 0.0); // rayTrace()
				let bp = hit.func_178782_a(); // getBlockPos()
				bp = bp.func_177972_a(Player.getPlayer().func_174811_aO().func_176734_d()) // Player.getHorizontalFacing().opposite()
				let x = bp.func_177958_n() + 0.5;
				let y = bp.func_177956_o() + 1;
				let z = bp.func_177952_p() + 0.5;
				usedTeleport = true;
				ChatLib.command(`tp ${x} ${y} ${z}`); // getX(), getY(), getZ()
				ChatLib.chat(`&aTeleported you to the targeted block!`)
			}
		};
	})

	const getCooldown = () => ((cooldown - (Date.now() - lastUsed)) / 1000).toFixed(1);

	register('chat', (event) => {
		const message = ChatLib.getChatMessage(event);
		if (selectingInAir && message.match(/^Position ([AB]) set to (-?\d+), (-?\d+), (-?\d+).$/) && Date.now() - lastUsed < cooldown) {
			World.playSound('random.orb', 0.25, 0.5);
			selectingInAir = false;
		} else if (selectingInAir && message.removeFormatting() === "You cannot select outside the plot!") {
			World.playSound('mob.endermen.portal', 8, 0);
			selectingInAir = false;
		} else if (usedTeleport && message.match(/Teleporting you to/) && Date.now() - lastUsed < cooldown) {
			cancel(event);
			World.playSound('mob.endermen.portal', 0.5, 1)
			usedTeleport = false;
		}
	}
	)
};






