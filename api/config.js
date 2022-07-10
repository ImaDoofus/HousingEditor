// read the config file and export the data

import HEFileReader from '../utils/HEFileReader.js';

const config = HEFileReader.readJSON('config.housingeditor');
if (!config) throw new Error('Could not read config.housingeditor');
export default config;

export function editConfig(key, value) {
	HEFileReader.setKey('config.housingeditor', key, value);
}
