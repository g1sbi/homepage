import type { CommandHandler } from '../types.js';

const ls: CommandHandler = () => ({
  type: 'text',
  lines: ['projects', 'blog']
});

export default ls;
