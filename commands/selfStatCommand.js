// credit: @Arisings / Modified from original

const options = ["set", "inc", "dec"];

const selfStatCommand = register("command", (stat, operation, value) => {
  operation = operation?.toLowerCase();
  value = parseInt(value);
  if (stat && options.includes(operation) && !isNaN(value)) ChatLib.command(`editstats ${Player.getName()} ${stat} ${operation} ${value}`);
  else if (stat) ChatLib.chat("&cInvalid Usage: /selfstat <stat> <set/inc/dec> <value>");
  else ChatLib.command(`viewstats ${Player.getName()}`);
});

selfStatCommand.setTabCompletions((args) => {
  if (args.length === 2) return options;
  return [];
});
selfStatCommand.setName("selfstat");
