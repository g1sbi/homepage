import type { CommandHandler, CommandResult } from '../types.js';
import ls from './ls.js';
import whoami from './whoami.js';
import blog from './blog.js';
import help from './help.js';
import projects from './projects.js';

const commands = new Map<string, CommandHandler>();
commands.set('ls', ls);
commands.set('whoami', whoami);
commands.set('blog', blog);
commands.set('projects', projects);
commands.set('help', help);

export function runCommand(name: string, args: string[]): CommandResult {
  const handler = commands.get(name.toLowerCase());
  if (!handler) {
    return { type: 'error', message: `command not found: ${name}` };
  }
  return handler(args);
}
