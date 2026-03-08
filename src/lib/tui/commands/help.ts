import type { CommandHandler } from '../types.js';

const help: CommandHandler = () => ({
  type: 'text',
  lines: [
    'usage: <command> [args]',
    '',
    '',
    'commands:',
    '',
    '  ls         list sections (projects, blog)',
    '  whoami     show current user',
    '  projects   go to projects',
    '  blog       go to blog',
    '  help       show this help'
  ]
});

export default help;
