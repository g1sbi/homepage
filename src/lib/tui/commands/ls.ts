import type { CommandHandler } from '../types.js';

const ls: CommandHandler = () => ({
  type: 'ls',
  items: [
    { name: 'projects', path: '/projects' },
    { name: 'blog', path: '/blog' },
    { name: 'music', path: '/music' }
  ]
});

export default ls;
