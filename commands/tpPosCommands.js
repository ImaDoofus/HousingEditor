import Settings from "../utils/config";
import { positions } from "../worldedit/selectionAddons";

if (Settings.useBetterWorldedit) {
  register("command", () => {
    if (positions[0].length === 0)
      return ChatLib.chat("&cPosition A is not set.");
    const [x, y, z] = positions[0];
    ChatLib.command(`tp ${x} ${y} ${z}`);
  })
    .setName("tpposa")
    .setAliases(["tppos1", "/tpposa", "/tppos1"]);

  register("command", () => {
    if (positions[1].length === 0)
      return ChatLib.chat("&cPosition B is not set.");
    const [x, y, z] = positions[1];
    ChatLib.command(`tp ${x} ${y} ${z}`);
  })
    .setName("tpposb")
    .setAliases(["tppos2", "/tpposb", "/tppos2"]);
}
