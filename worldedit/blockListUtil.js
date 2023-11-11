const blockList = JSON.parse(
  FileLib.read("HousingEditor", "worldedit/blocklist.json")
);

export function getTabCompletions(args) {
  const lastArg = args[args.length - 1]; // player is doing /set block1 block2 block3
  const filtered = blockList.filter((block) => block.name.includes(lastArg));
  filtered.sort((a, b) => {
    return a.name.indexOf(lastArg) - b.name.indexOf(lastArg);
  });
  return filtered.map((block) => block.name);
}

export function argsToIds(args) {
  let ids = [];
  args.forEach((arg) => {
    if (!arg) return;
    if (arg.match(/^[\:0-9]*$/)) ids.push(arg);
    else {
      let found = blockList.find((block) => block.name === arg);
      if (found) ids.push(found.id);
    }
  });
  return ids;
}
