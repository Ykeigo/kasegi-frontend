export type ChecklistTemplate = {
  id: string;
  checkItems: string[];
};

export const GameStatus = {
  Idle: 0,
  InGame: 1,
  Checking: 2,
} as const;
export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export type CheckItem = {
  title: string;
  checked: boolean;
};

export type Checklist = {
  id: string;
  checkItems: CheckItem[];
  createdAt: Date;
};
