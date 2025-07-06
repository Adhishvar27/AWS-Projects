const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const frontendConfig = `
export const BASE_URL = "${process.env.BASE_URL}";
`;

const configPath = path.join(__dirname, '..', 'public', 'config.js');
fs.writeFileSync(configPath, frontendConfig);
console.log('✅ public/config.js created with BASE_URL =', process.env.BASE_URL);
