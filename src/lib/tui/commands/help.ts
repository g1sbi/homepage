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
    '  blog       go to blog',
    '  projects   go to projects',
    '  cd         go back home (or cd .., cd ~)',
    '  help       show this help'
  ]
});

export default help;
