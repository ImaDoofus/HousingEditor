// config.js
import { @Vigilant @SliderProperty @SwitchProperty @NumberProperty @TextProperty @ButtonProperty @SliderProperty @CheckboxProperty } from 'Vigilance';
const metadata = FileLib.read("HousingEditor", "./metadata.json");
const version = JSON.parse(metadata).version;

@Vigilant("HousingEditor", `Housing Editor ${version}`, {
	getCategoryComparator: () => (a, b) => {
		const categories = ["General", "Actions / Items", "WorldEdit / Protools", "House Tracking", "Miscellaneous"];

		return categories.indexOf(a.name) - categories.indexOf(b.name);
	},
})
class Settings {

	// General

	@TextProperty({
		name: "Chat Prefix",
		description: "The prefix of most housing editor related messages, so you know the message is a result of housing editor and not other mods.",
		category: "General",
		subcategory: "General",
	})
	chatPrefix = "&f[&aHousing&f&lEditor&f]";

	@SwitchProperty({
		name: "Accidental House Delete Protection",
		description: "Prevents you from accidently resetting your plot or deleting your house.",
		category: "General",
		subcategory: "General",
	})
	houseDeleteProtection = true;

	// Actions / Items 

	@SwitchProperty({
		name: "Safe Mode",
		description: 'Will show you where to click while loading in an action, this requires manual input and is no longer considered a "macro".\n\n&aSafeMode is recommended if you want to be extra careful not to break the rules.',
		category: "Actions / Items",
		subcategory: "Actions / Items",
	})
	useSafeMode = false;
	
	@SwitchProperty({
		name: "Show Loading Messages",
		description: 'Whether or not to show "Loading action/item by @user" everytime you load an action.',
		category: "Actions / Items",
		subcategory: "Actions / Items",
	})
	showLoadingMessages = true;

	@SwitchProperty({
		name: "Spam Hider",
		description: 'Removes useless added action messages from chat and stops annoying sounds from playing.',
		category: "Actions / Items",
		subcategory: "Actions / Items",
	})
	spamhider = true;
	
	// MISCELLANEOUS

	@SliderProperty({
		name: "GUI Cooldown",
		description: "Amount of cooldown between clicking an item in a GUI.\n\nvalues under 20 will result in more errors.",
		category: "Miscellaneous",
		subcategory: "Miscellaneous",
		min: 10,
		max: 100
	})
	guiCooldown = 20;

	@SliderProperty({
		name: "GUI Timeout",
		description: "Amount of ticks after not clicking anything in the GUI before declaring an error and timing out.\n\n&eIf you have lots of lagspikes / slow internet and HousingEditor keeps timing out you should increase this.",
		category: "Miscellaneous",
		subcategory: "Miscellaneous",
		min: 60,
		max: 200
	})
	guiTimeout = 60;

	@SwitchProperty({
		name: "Debug messages",
		description: "Show debug messages in the console.",
		category: "Miscellaneous",
		subcategory: "Miscellaneous"
	})
	debug = false;

	// WORLDEDIT / PROTOOLS 

	@SwitchProperty({
		name: "Better WorldEdit",
		description: "Use the improved WorldEdit commands and features.",
		category: "WorldEdit / Protools",
		subcategory: "WorldEdit",
	})
	useBetterWorldedit = true;


	@CheckboxProperty({
		name: "Selection Tool",
		description: "Whether or not you should be given the \"Set Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	selectionTool = true

	@CheckboxProperty({
		name: "Set Tool",
		description: "Whether or not you should be given the \"Set Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	setTool = true

	@CheckboxProperty({
		name: "Fill Tool",
		description: "Whether or not you should be given the \"Fill Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	fillTool = true

	@CheckboxProperty({
		name: "Cut Tool",
		description: "Whether or not you should be given the \"Cut Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	cutTool = true

	@CheckboxProperty({
		name: "Copy Tool",
		description: "Whether or not you should be given the \"Copy Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	copyTool = true

	@CheckboxProperty({
		name: "Paste Tool",
		description: "Whether or not you should be given the \"Paste Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	pasteTool = true

	@CheckboxProperty({
		name: "Undo Tool",
		description: "Whether or not you should be given the \"Undo Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	undoTool = true

	@CheckboxProperty({
		name: "Teleportation Tool",
		description: "Whether or not you should be given the \"Teleportation Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	teleportationTool = true

	@CheckboxProperty({
		name: "Wireframe Tool",
		description: "Whether or not you should be given the \"Wireframe Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	wireframeTool = true

	@CheckboxProperty({
		name: "Walls Tool",
		description: "Whether or not you should be given the \"Walls Tool\".",
		category: "WorldEdit / Protools",
		subcategory: "Recieve Pro Tools",
	})
	wallsTool = true
	
	constructor() {
		this.initialize(this);
		this.setCategoryDescription("General", "&aHousingEditor Configuration\n\n&bhttps://www.housingeditor.com/")
		this.setCategoryDescription("Actions / Items", "&aConfigure how you like to load in actions and items.")
		this.setCategoryDescription("WorldEdit / Protools", "&aConfigure the added WorldEdit features in HousingEditor.")
		this.setCategoryDescription("House Tracking", "&eHouse tracking is not included in this version of HousingEditor.")
		this.setCategoryDescription("Miscellaneous", "&aA few more config options for development.\n&eYou probably won't need to change these.")
		this.setSubcategoryDescription("WorldEdit / Protools", "Recieve Pro Tools", "Configure what you want to receive when you run /protools.")
	}
}

export default new Settings();
