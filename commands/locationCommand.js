// credit: @chop / Modified from original

register("command", (argument) => {
  getLocation(argument);
})
  .setTabCompletions(["round"])
  .setName("location")
  .setAliases(["loc"]);

function roundCoord(num, arg = "") {
  if (arg == "round") return Math.floor(num) + 0.5;
  else return Math.round(num * 100) / 100;
}

function getLocation(arg) {
  const x = roundCoord(Player.getX(), arg);
  const y = roundCoord(Player.getY());
  const z = roundCoord(Player.getZ(), arg);
  const yaw = roundCoord(Player.getYaw());
  const pitch = roundCoord(Player.getPitch());

  new Message(
    new TextComponent(`&f&lPOSITION: &a${x}&f, &a${y}&f, &a${z}&f. &7(Hover)`)
      .setClick("run_command", `/ct copy ${x} ${y} ${z}`)
      .setHoverValue(`&6&lCLICK TO COPY\n${x} ${y} ${z}`)
  ).chat();
  new Message(
    new TextComponent(`&f&lROTATION: &a${yaw}&f, &a${pitch}&f. &7(Hover)`)
      .setClick("run_command", `/ct copy ${yaw} ${pitch}`)
      .setHoverValue(`&6&lCLICK TO COPY\n${yaw} ${pitch}`)
  ).chat();
}
