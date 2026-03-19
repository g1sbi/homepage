import type { CommandHandler } from '../types.js';

const music: CommandHandler = () => ({ type: 'navigate', path: '/music' });

export default music;
