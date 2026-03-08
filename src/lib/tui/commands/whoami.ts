import type { CommandHandler } from '../types.js';

const whoami: CommandHandler = () => ({
  type: 'whoami',
  name: 'Gisbi',
  avatarSrc: '/pfp.png'
});

export default whoami;
