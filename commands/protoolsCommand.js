import Settings from '../utils/config';
import getItemFromNBT from '../utils/getItemFromNBT';
import loadItemstack from '../utils/loadItemstack';

register('command', () => {
	genProtools()
}).setName('protools').setAliases(['/protools', 'pt', '/pt'])

function genProtools() {
	if (Player.asPlayerMP().player.field_71075_bZ.field_75098_d === false) return ChatLib.chat('&cYou must be in creative mode to use this command.');
	let itemstacks = []
	if (Settings.selectionTool) itemstacks.push(getItemFromNBT('{id:"minecraft:stick",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Selects a region with left and",1:"§7right clicks, which can then be",2:"§7modified with other tools.",3:"",4:"§7Command alias: §b//",5:"",6:"§eLeft click to select point A.",7:"§eRight click to select point B."],Name:"§0§bRegion Selection Tool"}},Damage:0s}').itemStack)
	if (Settings.setTool) itemstacks.push(getItemFromNBT('{id:"minecraft:bucket",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Opens a menu with options to",1:"§7fill your selected region with a",2:"§7block type.",3:"",4:"§7Command alias: §b//set",5:"",6:"§eClick to open!"],Name:"§0§bSet Tool"}},Damage:0s}').itemStack)
	if (Settings.fillTool) itemstacks.push(getItemFromNBT('{id:"minecraft:water_bucket",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Opens a menu with options to",1:"§7fill your selected region with a",2:"§7block type.",3:"",4:"§7Command alias: §b//fill",5:"",6:"§eClick to open!"],Name:"§0§bFill Tool"}},Damage:0s}').itemStack)
	if (Settings.cutTool) itemstacks.push(getItemFromNBT('{id:"minecraft:shears",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Deletes the selected region and",1:"§7copies it to your clipboard.",2:"",3:"§7Command alias: §b//cut",4:"",5:"§eRight click to cut."],Name:"§0§bCut Tool"}},Damage:0s}').itemStack)
	if (Settings.copyTool) itemstacks.push(getItemFromNBT('{id:"minecraft:paper",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Copies the selected region to",1:"§7your clipboard.",2:"",3:"§7Command alias: §b//copy",4:"",5:"§eRight click to copy."],Name:"§0§bCopy Tool"}},Damage:0s}').itemStack)
	if (Settings.pasteTool) itemstacks.push(getItemFromNBT('{id:"minecraft:slime_ball",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Pastes the contents of your",1:"§7clipboard to your plot at your",2:"§7location.",3:"",4:"§7Command alias: §b//paste",5:"",6:"§eRight click to paste."],Name:"§0§bPaste Tool"}},Damage:0s}').itemStack)
	if (Settings.undoTool) itemstacks.push(getItemFromNBT('{id:"minecraft:arrow",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Undoes your previous fill or",1:"§7paste operations.",2:"",3:"§7Command alias: §b//undo",4:"",5:"§eRight click to undo."],Name:"§0§bUndo Tool"}},Damage:0s}').itemStack)
	if (Settings.teleportationTool) itemstacks.push(getItemFromNBT('{id:"minecraft:feather",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Teleport to the block you are",1:"§7looking at. (Requires HousingEditor)",2:"",3:"§6HousingEditor Exclusive Item",4:"",5:"§eClick to use!"],Name:"§bTeleportation Tool"}},Damage:0s}').itemStack)
	if (Settings.wireframeTool) itemstacks.push(getItemFromNBT('{id:"minecraft:iron_horse_armor",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Opens a menu with options to",1:"§7WIREFRAME your selected region",2:"§7with a block type",3:"",4:"§7Command alias: §b//wireframe"],Name:"§0§bWireframe Tool"}},Damage:0s}').itemStack)
	if (Settings.wallsTool) itemstacks.push(getItemFromNBT('{id:"minecraft:fence",Count:1b,tag:{ench:[],display:{Lore:[0:"§7Opens a menu with options to",1:"§7WALL your selected region",2:"§7with a block type",3:"",4:"§7Command alias: §b//walls"],Name:"§0§bWall Tool"}},Damage:0s}').itemStack)
	itemstacks.forEach((itemstack, index) => {
		loadItemstack(itemstack, 36 + index)
	})
	ChatLib.chat(`&aAdded &e${itemstacks.length}&a protool${itemstacks.length === 1 ? '' : 's'} to your hotbar.`)
}

