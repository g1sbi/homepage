import type { CommandHandler } from '../types.js';

const projects: CommandHandler = () => ({
  type: 'navigate',
  path: '/projects'
});

export default projects;
