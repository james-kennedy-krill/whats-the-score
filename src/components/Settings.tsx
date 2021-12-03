import React, { useState, useRef, useContext } from 'react'
import { Popover } from '@headlessui/react'
import { CogIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { usePopper } from 'react-popper'
import tw, { styled } from 'twin.macro'

import { GameContext } from "../context/GameContext"


const PopoverStyled = tw(Popover)`
  absolute z-10 top-3 left-8 md:left-1/2 transform -translate-x-1/2
`

const PopoverButton = tw(Popover.Button)`
text-white 
bg-black
px-3 
py-2 
rounded-md 
inline-flex 
items-center 
text-base 
font-medium 
ring-white
ring-1
ring-opacity-100
hover:text-opacity-100 
focus:outline-none 
focus-visible:ring-1
focus-visible:ring-white 
focus-visible:ring-opacity-75
`

const PopoverPanel = tw(Popover.Panel)`
absolute z-10 w-screen max-w-sm px-4 mt-3 
transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl
`

const PopoverPanelWrapper = tw.div`
overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5
`

const PopoverPanelContent = tw.div`relative grid gap-8 bg-white p-7 lg:grid-cols-2`

const CogIconStyled = tw(CogIcon)`h-5 w-5 group-hover:text-opacity-80 transition ease-in-out duration-150`

const P = tw.p`text-sm font-medium text-gray-900`
const Input = tw.input`p-2 border-2 rounded ml-2`

const PlayerNameInput = ({ playerIndex, defaultName }: {playerIndex: number, defaultName: string}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const gameContext = useContext(GameContext)

  const saveName = (playerIndex: number, newName: string) => {
    gameContext.updateName(playerIndex, newName)
  }

  return (
  <P>Player {playerIndex+1} Name: <Input ref={inputRef} type="text" placeholder="Enter a name" onChange={(e: React.FormEvent<HTMLInputElement>) => saveName(playerIndex, e.currentTarget.value)} value={gameContext.gameData.playerData[playerIndex].name} /></P>)
}

export const Settings = () => {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <PopoverStyled>
      <PopoverButton ref={setReferenceElement}>
        <CogIconStyled 
        aria-hidden="true" />
        </PopoverButton>

      <PopoverPanel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <PopoverPanelWrapper>
          <PopoverPanelContent>
            {['Player 1', 'Player 2'].map((defaultName, index) => (
            <PlayerNameInput key={defaultName} defaultName={defaultName} playerIndex={index} />
            ))}
          </PopoverPanelContent>
          </PopoverPanelWrapper>
      </PopoverPanel>
    </PopoverStyled>
  )
}
