import Settings from "../utils/config";
import Navigator from "../gui/navigator";

register("chat", (event) => {
  if (!Settings.spamhider) return;
  if (!Settings.useSafeMode && Navigator.isWorking) cancel(event);
}).setCriteria(
  "\nPlease enter the text you wish to set in chat!\n [PREVIOUS] [CANCEL]"
);

register("chat", (event) => {
  if (!Settings.spamhider) return;
  cancel(event);
}).setCriteria(/^Added (?:action|condition) .+!$/);

register("soundPlay", (pos, name, vol, pitch, category, event) => {
  if (!Settings.spamhider) return;
  if (name === "note.pling" && pitch === 4.047618865966797) cancel(event);
});
