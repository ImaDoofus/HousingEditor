import getItemFromNBT from "../utils/getItemFromNBT";
import loadItemstack from "../utils/loadItemstack";

function isCreative() {
    return Player.asPlayerMP().player.field_71075_bZ.field_75098_d
}

function getItemLore(item) {
    let lore = []
    if (item.getNBT()?.getTag("tag")?.getTag("display").get("Lore")) lore = item.getNBT().toObject()['tag']['display']['Lore']
    return lore
}

register('command', () => {
    if (Player.getHeldItem()) {
        ChatLib.command(`ct copy ${Player.getHeldItem().getRawNBT()}`, true);
        ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aCopied item NBT to clipboard.`);
    } else {
        ChatLib.chat(`&cYou must be holding an item to use this command.`)
    }
}).setName('nbt')

NBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");

function setHeldItemTag(key, value) {
    new_nbt = new NBTTagCompound();
    new_nbt.func_74774_a(key, value)
    loadItemstack(
        getItemFromNBT(
            Player.getHeldItem().getItemNBT().setNBTBase("tag", new_nbt)
        ).itemStack, Player.getHeldItemIndex() + 36
    );
}

register('command', (boolean = null) => {
    boolean = { 'true': true, 'false': false }[boolean?.toLowerCase()]
    if (!isCreative()) return ChatLib.chat('&cYou must be in creative mode to use this command.');
    if (!Player.getHeldItem()) return ChatLib.chat(`&cYou must be holding an item to use this command.`)
    if ((!Player.getHeldItem().getNBT().getTag('tag')?.getByte('Unbreakable') && boolean !== false) || boolean === true) {
        if (!Player.getHeldItem().getNBT().getTag('tag')) {
            setHeldItemTag('Unbreakable', 1);
        } else {
            Player.getHeldItem().getItemNBT().getTag('tag').setByte('Unbreakable', 1)
        }
        ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aItem is now unbreakable.`)
    } else {
        if (Player.getHeldItem().getNBT().getTag('tag')) {
            Player.getHeldItem().getItemNBT().getTag('tag').setByte('Unbreakable', 0)
        }
        ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aItem is now breakable.`)
    }

}).setName('unbreakable').setAliases(['ub'])

register('command', (boolean = null, value = 127) => {
    boolean = { 'true': true, 'false': false }[boolean?.toLowerCase()]
    if (value < -128 || value > 127 || isNaN(value)) return ChatLib.chat('&cInvalid custom HideFlag value, must be a byte.');
    if (!isCreative()) return ChatLib.chat('&cYou must be in creative mode to use this command.');
    if (!Player.getHeldItem()) return ChatLib.chat(`&cYou must be holding an item to use this command.`)
    if ((!Player.getHeldItem().getNBT().getTag('tag')?.getByte('HideFlags') && boolean !== false) || boolean === true) {
        if (!Player.getHeldItem().getNBT().getTag('tag')) {
            setHeldItemTag('HideFlags', parseInt(value));
        } else {
            Player.getHeldItem().getItemNBT().getTag('tag').setByte('HideFlags', parseInt(value))
        }
        ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aItem flags hidden.`)
    } else {
        if (Player.getHeldItem().getNBT().getTag('tag')) {
            Player.getHeldItem().getItemNBT().getTag('tag').setByte('HideFlags', 0)
        }
        ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aAll item flags are now visible.`)
    }

}).setName('hideflags').setAliases(['hf'])

register('command', (mode, ...params) => {
    let item = Player.getHeldItem()
    if (!isCreative()) return ChatLib.chat('&cYou must be in creative mode to use this command.');
    if (!item) return ChatLib.chat(`&cYou must be holding an item to use this command.`)
    mode = mode?.toLowerCase()
    lore = getItemLore(item)
    switch (mode) {
        case 'add':
            text = params.join(' ')
            if (!text) return ChatLib.chat('&cInvalid Usage: /lore add <text>')
            lore.push(text)
            item.setLore(lore)
            ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aAdded lore to item.`)
            break;
        case 'clear':
            item.setLore([])
            ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aCleared lore from item.`)
            break;
        case 'list':
            if (lore.length > 0) {
                ChatLib.chat(`&r${item.getName()}&r&7's Lore:`)
                for (let i = 0; i < lore.length; i++) {
                    ChatLib.chat(`&a${i + 1} &7- &r&5&o${lore[i]}`)
                }
            } else {
                ChatLib.chat("&cThis item has no lore.")
            }
            break;
        case 'set':
            index = parseInt(params[0])
            text = params.slice(1).join(' ')
            if (isNaN(index) || !text) return ChatLib.chat('&cInvalid Usage: /lore set <index> <text>')
            if (index < 1 || index > lore.length) return ChatLib.chat('&cSpecified line index is out of the item\'s range.')
            newLore = lore
            newLore[index - 1] = text
            item.setLore(newLore)
            ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aLore line successfully updated.`)
            break;
        case 'remove':
            index = parseInt(params[0])
            if (isNaN(index)) return ChatLib.chat('&cInvalid Usage: /lore remove <index>')
            if (index < 1 || index > lore.length) return ChatLib.chat('&cSpecified line index is out of the item\'s range.')
            newLore = lore
            newLore.splice(index - 1, 1)
            item.setLore(newLore)
            ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aLore line successfully removed.`)
            break;
        default:
            ChatLib.chat('&6Usage:')
            ChatLib.chat("/lore set <line index> [text]")
            ChatLib.chat("/lore add <text>")
            ChatLib.chat("/lore remove <line index>")
            ChatLib.chat("/lore list")
            ChatLib.chat("/lore clear")
    }
}).setName('lore')

register('command', (...text) => {
    if (!isCreative()) return ChatLib.chat('&cYou must be in creative mode to use this command.');
    if (!Player.getHeldItem()) return ChatLib.chat(`&cYou must be holding an item to use this command.`)
    if (!text) return ChatLib.chat('&cInvalid Usage: /rename <text>')
    text = text.join(' ')
    Player.getHeldItem().setName(text)
    ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aRenamed item.`)
}).setName('rename')

register('command', () => {
    if (!isCreative()) return ChatLib.chat('&cYou must be in creative mode to use this command.');
    loadItemstack(
        getItemFromNBT('{id:"minecraft:heavy_weighted_pressure_plate",Count:1b,tag:{display:{Lore:[0:"§7Place this block in your house",1:"§7to place an Action Pad!"],Name:"§aAction Pad"}},Damage:0s}').itemStack,
        Player.getHeldItemIndex() + 36
    )
    ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aGave you an action pad!`);

}).setName('actionpad').setAliases(['ap'])

register('command', () => {
    if (!isCreative()) return ChatLib.chat('&cYou must be in creative mode to use this command.');
    loadItemstack(
        getItemFromNBT('{id:"minecraft:name_tag",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house to",1:"§7place a Hologram!"],Name:"§aHologram"}},Damage:0s}').itemStack,
        Player.getHeldItemIndex() + 36
    )
    ChatLib.chat(`&f[&aHousing&f&lEditor&f]&r &aGave you a hologram!`);

}).setName('hologram').setAliases(['hg'])

register('command', (mode, ...params) => {
    mode = mode.toLowerCase();
    if (mode === '') {

    } else {

    }
}).setName('item')



// /lore command
    // /lore set <line index> [text]
    // /lore add <text>
    // /lore remove <line index>
    // /lore list
    // /lore clear
// /get command (/i, /give)
// /glow command
// /nbt command show formatted json
// /tag command
// /rename command
// /count command
// /material command
// /enhant command (use built-in)
// /metadata command
// /wear
