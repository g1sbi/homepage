import type { CommandHandler } from '../types.js';

const help: CommandHandler = () => ({
  type: 'text',
  lines: [
    'usage: <command> [args]',
    '',
    '',
    'commands:',
    '',
    '  ls         list sections (projects, blog, music)',
    '  whoami     show current user',
    '  blog       go to blog',
    '  projects   go to projects',
    '  music      go to music',
    '  cd         go back home (or cd .., cd ~)',
    '  help       show this help'
  ]
});

export default help;
