export type CommandResult =
  | { type: 'text'; lines: string[] }
  | { type: 'whoami'; name: string; avatarSrc: string }
  | { type: 'navigate'; path: string }
  | { type: 'error'; message: string };

export type HistoryEntry = {
  command: string;
  args: string[];
  result: CommandResult;
};

export type CommandHandler = (args: string[]) => CommandResult;
