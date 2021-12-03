import { useContext } from 'react'
import tw from "twin.macro"

import Player from "./Player"

import { GameContext } from "../context/GameContext"


const PlayerCardHolderStyled = tw.div`w-screen h-screen grid gap-0 grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1`

export const PlayerCardHolder = () => {
  const gameContext = useContext(GameContext);
  return (
    <PlayerCardHolderStyled>
      {gameContext.gameData.playerData.map((player, index) => <Player key={`${player.name}-${index}`} playerIndex={index} />)}
    </PlayerCardHolderStyled>
  )
}
