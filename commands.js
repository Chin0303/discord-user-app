import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const MEOW_COMMAND = {
  name: 'meow',
  type: 1,
  description: 'Car meow',
  integration_types: [1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [
  MEOW_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
