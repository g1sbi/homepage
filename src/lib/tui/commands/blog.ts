import type { CommandHandler } from '../types.js';

const blog: CommandHandler = () => ({
  type: 'navigate',
  path: '/blog'
});

export default blog;
