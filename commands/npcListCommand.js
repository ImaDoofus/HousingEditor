register("command", () => {
  if (!TabList.getFooter().includes("You are in ")) return ChatLib.chat("&cYou must be in a housing to use this command!");
  let npcs = [];

  // Collect all NPCs in your world as objects
  World.getAllPlayers().forEach((p) => {
    if (p.getUUID().version() === 2 && p.getName() !== "Carpenter ") {
      npcs.push(p);
    }
  });

  if (npcs.length === 0) return ChatLib.chat("&cThere are no NPCs in your render distance!");
  let output = new Message(`&7NPC List &b(${npcs.length})\n`);

  // Iterate through the NPC list and add an entry in the chat message that will be sent listing all the NPCs
  for (let i = 0; i < npcs.length; i++) {
    let npc = npcs[i];
    output.addTextComponent(new TextComponent(`&a${i + 1} &7- `)); // index of NPC
    let name = getNPCDisplayName(npc) || "&cNo Name";
    output.addTextComponent(
      new TextComponent(`&r${name}`).setHoverValue(`&eDisplay Name: &r${name}\n&eEntity Name: &7${npc.getName()}\n&eUUID: &7${npc.getUUID()}`)
    );
    output.addTextComponent(new TextComponent(`&7: `));
    output.addTextComponent(
      new TextComponent(`&b${npc.getX()}&3, &b${npc.getY()}&3, &b${npc.getZ()}`)
        .setHoverValue(`&eClick to teleport to NPC`)
        .setClick("run_command", `/tp ${npc.getX()} ${npc.getY()} ${npc.getZ()}`)
    ); // NPC's coordinates
    if (i < npcs.length - 1) output.addTextComponent(`\n`);
  }
  ChatLib.chat(output);
})
  .setName("npclist")
  .setAliases(["npcl"]);

// NPC's name is separate hologram so this function will try to get a NPC's display name
const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
function getNPCDisplayName(npc) {
  const isSeperateHologram = (e) => e.distanceTo(npc) === 0.09375;
  let armorStands = World.getAllEntitiesOfType(EntityArmorStand.class);
  return armorStands.find(isSeperateHologram)?.getName();
}
