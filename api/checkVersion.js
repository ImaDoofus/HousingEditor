import { request as axios } from "axios";
import { HOSTNAME } from "./hostname";
import Settings from "../utils/config";

const metadata = FileLib.read("HousingEditor", "./metadata.json");
export const version = JSON.parse(metadata).version;

let versionWasChecked = false;

register("worldLoad", () => {
  if (!versionWasChecked) {
    ChatLib.chat(`${Settings.chatPrefix}&r&a Checking for updates...`);
    checkVersion();
    versionWasChecked = true;
  }
});

function checkVersion() {
  axios({
    url: HOSTNAME + "/version/" + version,
    method: "GET",
  })
    .then((response) => {
      const contentType = response.headers["Content-Type"];
      if (contentType.indexOf("application/json") > -1) ChatLib.chat(response.data?.message);
      else error(response);
    })
    .catch((error) => {
      error(error);
    });
}

function error(error) {
  ChatLib.chat("&cFailed to load HousingEditor check console for errors");
  ChatLib.chat("&7/ct console js");
  console.error(error);
}
