import React, { createContext, useState } from "react";
import { GameMatch } from "../ClassDefinition";

type GameMatchesContextType = {
  gameMatches: GameMatch[];
  setGameMatches: (ct: GameMatch[]) => void;
  getGameMatches: () => GameMatch[];
  addGameMatch: (ct: GameMatch) => void;
};
const defaultGameMatchValue: GameMatch[] = [
  {
    id: "sample",
    checkItems: [
      { title: "サンプル1", checked: true },
      { title: "サンプル2", checked: false },
    ],
    createdAt: new Date(),
  },
];

export const GameMatchesContext = createContext<GameMatchesContextType>({
  gameMatches: [],
  setGameMatches: (gameMatches: GameMatch[]) => {},
  getGameMatches: () => defaultGameMatchValue,
  addGameMatch: (gameMatch: GameMatch) => {},
});

/**
 * プロバイダ (これ以下の要素で UserContext を使える)
 */
export const GameMatchesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // ユーザ情報の初期値
  const [gameMatches, set] = useState<GameMatch[]>(defaultGameMatchValue);

  const getGameMatches = () => gameMatches;

  const setGameMatches = (entity: GameMatch[]) => set(entity);

  const addGameMatch = (entity: GameMatch) =>
    setGameMatches([...gameMatches, entity]);

  return (
    <GameMatchesContext.Provider
      value={{ gameMatches, setGameMatches, getGameMatches, addGameMatch }}
    >
      {children}
    </GameMatchesContext.Provider>
  );
};
