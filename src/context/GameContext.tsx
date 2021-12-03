import React, { createContext, useState } from "react";

export type Player = {
  name: string;
  score: number;
  bgcolor: string;
  fgcolor: string;
}

export interface GameData {
  playerData: Player[];
  gameOptions: {
    players: number;
    incrementBy: number;
    lowScoreWins: boolean;
  }
}

export const gameData: GameData = {
  playerData: [
    {
      name: "Player 1",
      score: 0,
      bgcolor: "black",
      fgcolor: "white"
    },
    {
      name: "Player 2",
      score: 0,
      bgcolor: "white",
      fgcolor: "black"
    }
  ],
  gameOptions: {
    players: 2,
    incrementBy: 1,
    lowScoreWins: false,
  }
}

export const GameContext = createContext({
  gameData: gameData,
  updateScore: (playerIndex: number, updatedScore: number): void => {},
  updateName: (playerIndex: number, updatedName: string): void => {}
});

export const GameProvider = ({ children }: {children: React.ReactNode}): JSX.Element => {
  const [gameDataState, setGameDataState] = useState<GameData>(gameData);
  
  const updateScore = (playerIndex: number, updatedScore: number): void => {
    const newPlayerData = gameDataState.playerData.map((player, index) => {
      if (index === playerIndex) {
        return {...player, score: updatedScore};
      }
      return player;
    })
    setGameDataState({...gameData, playerData: newPlayerData});
  }

  const updateName = (playerIndex: number, updatedName: string): void => {
    const newPlayerData = gameDataState.playerData.map((player, index) => {
      if (index === playerIndex) {
        return {...player, name: updatedName};
      }
      return player;
    })
    setGameDataState({...gameData, playerData: newPlayerData});
  }

  return (
    <GameContext.Provider value={{ gameData: gameDataState, updateScore, updateName }}>
      {children}
    </GameContext.Provider>
  )
}
