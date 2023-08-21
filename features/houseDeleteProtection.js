import Settings from "../utils/config";

register("guiOpened", () => {
  //waits until the gui is loaded
  Client.scheduleTask(() => {
    if (
      Settings.houseDeleteProtection &&
      Player?.getContainer()?.getName() === "Confirm House Reset"
    ) {
      ChatLib.chat(
        `${Settings.chatPrefix} &cProtected your house from deletion. Change the config to disable this.`
      );
      Client.currentGui.close();
    }
  });
});
