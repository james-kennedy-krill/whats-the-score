import React, { useState, useContext } from 'react'
import { PlusIcon, MinusIcon, CalculatorIcon } from '@heroicons/react/solid'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import tw, { styled } from 'twin.macro'

import { GameContext } from '../context/GameContext'
import { Calculator } from './Calculator'

interface PlayerCardProps {
  readonly bgcolor?: string;
  readonly fgcolor?: string;
}

const PlayerCard = styled.div(({ bgcolor, fgcolor }: PlayerCardProps) => {
  return [
  tw`
  flex
  flex-col
  items-center
  justify-center
  h-full
  md:h-screen`,
  `background-color: ${bgcolor};`,
  `color: ${fgcolor}`
]})

const InnerPlayerWrapper = tw.div`
w-1/2 h-5/6 md:h-2/3 m-auto flex flex-col items-center justify-between
`

const PlayerNumber = tw.p``
const Name = tw.h1`text-xl font-bold`
const Input = tw.input`bg-white text-black p-2 text-xl font-bold`
const Score = tw.p`text-6xl md:text-8xl`
const Controls = tw.div`
  grid
  gap-2
  grid-cols-3
`;

const Button = styled.button(({ bgcolor, fgcolor}: PlayerCardProps) => {
  return [
    tw`w-8 h-8 ring-1 ring-white p-2 flex items-center justify-center text-xl leading-none`,
    `--tw-ring-color: ${fgcolor}`
  ]
})
const Subtract = tw(Button)`hover:text-red-700 hover:ring-red-700 active:text-red-900 active:ring-red-900 transition ease-in-out duration-150`
const Add = tw(Button)`hover:text-green-700 hover:ring-green-700 active:text-green-900 active:ring-green-900 transition ease-in-out duration-150`
const PopoverButton = styled(Popover.Button)(({ bgcolor, fgcolor}: PlayerCardProps) => {
  return [
    tw`w-8 h-8 ring-1 ring-white p-2 flex items-center justify-center text-xl leading-none`,
    `--tw-ring-color: ${fgcolor}`,
    tw`text-sm uppercase hover:text-blue-700 hover:ring-blue-700 
active:text-blue-900 active:ring-blue-900 
transition ease-in-out duration-150`
  ]
})
const CalculateIconStyled = tw(CalculatorIcon)`
h-6
`

const PopoverStyled = tw(Popover)`relative`
const PopoverPanel = tw(Popover.Panel)`absolute z-50`
const PopoverContentWrapper = tw.div``


export type PlayerData = {
  name: string;
  score: number;
  bgcolor: string;
  fgcolor: string;
}

interface PlayerProps {
  playerIndex: number;
}

const Player = ({ playerIndex }: PlayerProps) => {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, -50]
        }
      },
      {
        name: 'arrow',
        options: {
          element: arrowElement
        }
      }
    ]
  })
  const gameContext = useContext(GameContext)
  const player: PlayerData = gameContext.gameData.playerData[playerIndex]

  const handleEnter = (newValue: number | string, close: () => void) => {
    gameContext.updateScore(playerIndex, player.score+parseFloat(newValue as string));
    close();
  }

  return (
    <>
  <PlayerCard bgcolor={player.bgcolor} fgcolor={player.fgcolor}>
    <InnerPlayerWrapper>
      <div>
        <PlayerNumber>Player {playerIndex + 1}</PlayerNumber>
        <Name>{player.name}</Name>
      </div>
      <Score>{player.score}</Score>
      <Controls>
        <Subtract bgcolor={player.bgcolor} 
        fgcolor={player.fgcolor} 
        onClick={() => gameContext.updateScore(playerIndex, player.score-1)}><MinusIcon /></Subtract>
        <Popover>
          {({ open, close }) => (
            <>
          <PopoverButton bgcolor={player.bgcolor} fgcolor={player.fgcolor} ref={setReferenceElement}><CalculateIconStyled /></PopoverButton>
          <PopoverPanel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            <PopoverContentWrapper>
              <Calculator handleEnter={(newValue) => handleEnter(newValue, close)} />
            </PopoverContentWrapper>
            <div ref={setArrowElement} style={styles.arrow} />
          </PopoverPanel>
            </>
          )}
        </Popover>
        <Add bgcolor={player.bgcolor} fgcolor={player.fgcolor} onClick={() => gameContext.updateScore(playerIndex, player.score+1)}><PlusIcon /></Add>
      </Controls>
    </InnerPlayerWrapper>
  </PlayerCard>
  </>
    )
}

export default Player;
