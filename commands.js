import rollupCommand from './commands/rollup.js';
import rollupContextCommand from './commands/rollup-context.js';
import purgeCommand from './commands/purge.js';
import purgeContextCommand from './commands/purge-context.js';

const commands = [];
commands.push(rollupCommand);
commands.push(rollupContextCommand);
commands.push(purgeCommand);
commands.push(purgeContextCommand);

export default commands;
