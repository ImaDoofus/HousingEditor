import config from '../api/config.js';
import loadItemstack from '../utils/loadItemstack.js';

register('command', () => {
	genProtools()
}).setName('protools').setAliases(['/protools', 'pt', '/pt'])

function genProtools() {
	if (Player.asPlayerMP().player.field_71075_bZ.field_75098_d === false) return ChatLib.chat('&cYou must be in creative mode to use this command.');
	let itemstacks = []
	if (config.regionSelectionTool) itemstacks.push(getItem('minecraft:stick', '§0§bRegion Selection Tool'))
	if (config.setTool) itemstacks.push(getItem('minecraft:bucket', '§0§bSet Tool'))
	if (config.fillTool) itemstacks.push(getItem('minecraft:water_bucket', '§0§bFill Tool'))
	if (config.cutTool) itemstacks.push(getItem('minecraft:shears', '§0§bCut Tool'))
	if (config.copyTool) itemstacks.push(getItem('minecraft:paper', '§0§bCopy Tool'))
	if (config.pasteTool) itemstacks.push(getItem('minecraft:slime_ball', '§0§bPaste Tool'))
	if (config.undoTool) itemstacks.push(getItem('minecraft:arrow', '§0§bUndo Tool'))
	if (config.teleportationTool) itemstacks.push(getItem('minecraft:feather', '§0§bTeleportation Tool'))
	itemstacks.forEach((itemstack, index) => {
		loadItemstack(itemstack, 36 + index)
	})
	ChatLib.chat(`&aAdded &e${itemstacks.length}&a protool${itemstacks.length === 1 ? '' : 's'} to your hotbar.`)
}

function getItem(type, name) {
	let item = new Item(type);
	item.setName(name);
	item.itemStack.func_77966_a(net.minecraft.enchantment.Enchantment.field_180310_c, 1)
	return item.itemStack
}