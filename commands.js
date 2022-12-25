import rollupCommand from './commands/rollup.js';
import rollupContextCommand from './commands/rollup-context.js';
import purgeCommand from './commands/purge.js';
import purgeContextCommand from './commands/purge-context.js';
import roadmapCommand from './commands/roadmap.js';
import bugCommand from './commands/bug.js';

const commands = [];
commands.push(rollupCommand);
commands.push(rollupContextCommand);
commands.push(purgeCommand);
commands.push(purgeContextCommand);
commands.push(roadmapCommand);
commands.push(bugCommand);

export default commands;
