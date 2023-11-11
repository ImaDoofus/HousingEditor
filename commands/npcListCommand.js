const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const EntityOtherPlayerMP = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP");

let cachedNPCs = {};
let cachedArmorstands = {};

register("command", () => {
  if (!TabList.getFooter().includes("You are in ")) return ChatLib.chat("&cYou must be in a housing to use this command!");

  let npcs = Object.values(cachedNPCs);
  let armorstands = Object.values(cachedArmorstands);
  if (npcs.length === 0) return ChatLib.chat("&cNo NPCs were found!");
  let output = new Message(`&aNPC List &7(${npcs.length})\n`);

  for (let i = 0; i < npcs.length; i++) {
    let npc = npcs[i];
    // Nametag is the armor stand 0.09375 blocks away from NPC
    let name = armorstands.find((e) => e.distanceTo(npc) === 0.09375)?.name || "&cUnknown";

    [
      new TextComponent(`  &a${i + 1} &7- `), // index of NPC
      new TextComponent(`&r${name}`)
        .setHoverValue(`&eDisplay Name: &r${name}\n&eEntity Name: &7${npc.name}\n&eUUID: &7${npc.uuid}`)
        .setClick("suggest_command", ChatLib.removeFormatting([name, npc.name, npc.uuid].join(" "))),
      new TextComponent(`&7: `),
      new TextComponent(`&b${npc.x}&3, &b${npc.y}&3, &b${npc.z}`)
        .setHoverValue(`&eClick to teleport to NPC`)
        .setClick("run_command", `/tp ${npc.x} ${npc.y} ${npc.z}`),
      new TextComponent(`\n`),
    ].forEach((c) => output.addTextComponent(c));
  }
  ChatLib.chat(output);
})
  .setName("npclist")
  .setAliases(["npcl"]);

register("step", () => {
  let armorStands = World.getAllEntitiesOfType(EntityArmorStand.class);
  armorStands.forEach((armorStand) => (cachedArmorstands[armorStand.getUUID()] = new CachedEntity(armorStand)));

  let npcs = World.getAllEntitiesOfType(EntityOtherPlayerMP.class);
  npcs = npcs.filter((p) => p.getUUID().version() === 2 && p.getName() !== "Carpenter ");
  npcs.forEach((npc) => (cachedNPCs[npc.getUUID()] = new CachedEntity(npc)));
}).setFps(1);

register("worldLoad", () => {
  cachedArmorstands = {};
  cachedNPCs = {};
});

class CachedEntity {
  constructor(entity) {
    this.x = entity.getX();
    this.y = entity.getY();
    this.z = entity.getZ();
    this.name = entity.getName();
    this.uuid = entity.getUUID();
  }

  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2 + (this.z - other.z) ** 2);
  }
}
