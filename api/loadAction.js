import { request as axios } from "axios";
import { HOSTNAME } from "./hostname";
import { addOperation } from "../gui/queue";
import Action from "../actions/Action";
import Settings from "../utils/config";

export default (actionId) => {
  if (actionId === "test") return loadTestAction();

  axios({
    url: `${HOSTNAME}/actions/${actionId}`,
    method: "GET",
  })
    .then((response) => {
      const json = response.data;
      loadResponse(json.actionData, json.post?.title, json.author?.name);
    })
    .catch((error) => {
      if (!error.response) return ChatLib.chat("&cError: " + error);
      const response = error.response;
      const contentType = response.headers["Content-Type"];
      if (contentType.indexOf("application/json") > -1) {
        const json = response.data;
        ChatLib.chat("&cError: " + json.message);
      } else {
        ChatLib.chat("&cError: " + response.statusText);
      }
      Client.currentGui.close();
    });
};

function loadResponse(actionList, actionName, actionAuthor) {
  if (Settings.showLoadingMessage)
    ChatLib.chat(`Loading action: ${actionName}&r by &b@${actionAuthor}`);
  for (let i = 0; i < actionList.length; i++) {
    let actionType = actionList[i][0];
    let actionData = actionList[i][1];
    let action = new Action(actionType, actionData);
    action.load();
  }
  addOperation(["done", { actionName, actionAuthor }]);
}

function loadTestAction() {
  ChatLib.chat("Loading test action.");
  let change_player_stat = new Action("send_a_chat_message", {
    message: "howdy",
  });
  change_player_stat.load();
  addOperation([
    "done",
    { actionName: "Test Action", actionAuthor: "Test Author" },
  ]);
}
