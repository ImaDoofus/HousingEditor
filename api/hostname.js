import config from './config.js';
const isProduction = config.production;

export const HOSTNAME = isProduction ? 'https://api.housingeditor.com' : 'http://localhost:3000';
