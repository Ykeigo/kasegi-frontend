import React, { createContext, useState } from "react";
import { GameStatus } from "../ClassDefinition";

type GameStatusContextType = {
  gameStatus: GameStatus;
  setGameStatus: (status: GameStatus) => void;
  getGameStatus: () => GameStatus;
};

export const GameStatusContext = createContext<GameStatusContextType>({
  gameStatus: GameStatus.Idle,
  setGameStatus: (status: GameStatus) => {},
  getGameStatus: () => GameStatus.Idle,
});

const defaultMyTipsValue = {
  id: "",
  tip: {
    title: "",
    description: "",
  },
  helpful_num: 0,
  helped_today: false,
  forgot_today: false,
};

/**
 * プロバイダ (これ以下の要素で UserContext を使える)
 */
export const GameStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ユーザ情報の初期値
  const [gameStatus, set] = useState<GameStatus>(GameStatus.Idle);

  const getGameStatus = () => gameStatus;

  const setGameStatus = (entity: GameStatus) => set(entity);

  return (
    <GameStatusContext.Provider
      value={{ gameStatus, setGameStatus, getGameStatus }}
    >
      {children}
    </GameStatusContext.Provider>
  );
};
