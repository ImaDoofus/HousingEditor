let lastUsed = Date.now();
const COOLDOWN = 1000;
let usedUp = false;
const housingMinY = 94;
const housingMaxY = 194;

register("command", (amount) => {
  if (Date.now() - lastUsed < COOLDOWN) return ChatLib.chat(`&cYou must wait &e${getCooldown()}s &cto do that!`);
  if (!amount) amount = 194;
  if (isNaN(parseInt(amount))) return ChatLib.chat(`&cYou must enter a number!`);
  const y = Math.round(parseInt(amount) + Player.getY());
  if (y < housingMinY) ChatLib.chat(`&aTeleported you to the bottom of the housing plot!`);
  else if (y > housingMaxY) ChatLib.chat(`&aTeleported you to the top of the housing plot!`);
  else ChatLib.chat(`&aTeleported you to Y=&e${y}&a.`);
  lastUsed = Date.now();
  usedUp = true;
  ChatLib.command(`tp ${Player.getX()} ${MathLib.clamp(y, housingMinY, housingMaxY)} ${Player.getZ()}`);
})
  .setName("up")
  .setAliases(["/up"]);

const getCooldown = () => ((COOLDOWN - (Date.now() - lastUsed)) / 1000).toFixed(1);

// dont show default hypixel teleport message on /up
register("chat", (event) => {
  const message = ChatLib.getChatMessage(event);
  if (message.match(/Teleporting you to/) && usedUp) {
    cancel(event);
    usedUp = false;
  }
});
