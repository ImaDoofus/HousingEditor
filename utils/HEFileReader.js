// my own implementation i know its goofy

class HEFileReader {
	static read(filePath) {
		const split = filePath.split('.');
		const extension = split[split.length - 1];
		if (extension !== 'housingeditor') return null;
		const fileString = FileLib.read('HousingEditor', filePath);
		if (!fileString) return null;
		return fileString;
	}

	static readJSON(filePath) {
		const fileString = HEFileReader.read(filePath);
		if (!fileString) return null;
		return HEFileReader.parseToJson(fileString);
	}

	static parseToJson(fileString) {
		let json = {};
		const split = fileString.split('\n');
		for (let i = 0; i < split.length; i++) {
			let line = split[i];
			let lineData = HEFileReader.getLineData(line);
			if (!lineData) continue;
			json[lineData.key] = lineData.value;
		}
		return json;
	}

	static getLineData(line) {
		if (line.startsWith('#')) return;
		let splitLine = line.split(':', 2);
		if (splitLine.length !== 2) return;
		let key = splitLine[0].trim();
		let value = HEFileReader.valueReader(splitLine[1].trim());
		return { key, value };
	}

	static valueReader(value) {
		if (value === 'true') return true;
		if (value === 'false') return false;
		if (value.match(/^\d+$/)) return parseInt(value);
		if (value.match(/^\d+\.\d+$/)) return parseFloat(value);

		return value;
	}

	static setKey(filePath, key, value) {
		const fileString = HEFileReader.read(filePath);
		if (!fileString) return;
		let split = fileString.split('\n');
		for (let i = 0; i < split.length; i++) {
			let line = split[i];
			let lineData = HEFileReader.getLineData(line);
			if (!lineData) continue;
			if (lineData.key === key) {
				console.log(lineData.key);
				split[i] = `${key}: ${value}`;
				break;
			}
		}
		FileLib.write('HousingEditor', filePath, split.join('\n'));
	}
}

export default HEFileReader;