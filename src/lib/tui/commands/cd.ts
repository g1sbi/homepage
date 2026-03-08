import type { CommandHandler } from '../types.js';

const cd: CommandHandler = (args) => {
  const target = args[0]?.toLowerCase();
  if (!target || target === '..' || target === '~') {
    return { type: 'navigate', path: '/' };
  }
  if (target === 'blog') return { type: 'navigate', path: '/blog' };
  if (target === 'projects') return { type: 'navigate', path: '/projects' };
  return { type: 'error', message: `cd: no such directory: ${target}` };
};

export default cd;
