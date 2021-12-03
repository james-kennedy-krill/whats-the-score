import React, { useState, useEffect, useRef } from 'react'
import { PlusIcon, MinusIcon } from "@heroicons/react/solid"
import tw, { styled } from 'twin.macro'

import { findResult } from '../utils/math'

interface ButtonProps {
  className?: string;
  label: string;
  value: string;
  handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const Button = ({ className, label, value, handleClick }: ButtonProps): JSX.Element => {

  return (<button className={className} type="button" value={value} onClick={handleClick}>{label}</button>)
}

const CalculatorWrapper = tw.div`bg-gray-400 ring-1 ring-black p-8 text-black rounded-xl`
const CalculatorScreenWrapper = tw.div`relative`
const CalculatorEquation = tw.input`absolute bg-white shadow rounded top-2 right-2 text-xs text-right focus:ring-opacity-0 focus-visible:ring-opacity-0 focus:outline-none focus-visible:outline-none active:ring-opacity-0 px-1`
const CalculatorScreen = tw.input`text-lg text-right ring-1 ring-black rounded mb-8 bg-blue-100 inset-4 pt-6 pb-2 px-3`
const CalculatorButton = tw(Button)`bg-white hover:bg-gray-200 shadow-sm inset-1 ring-1 ring-black ring-opacity-100 rounded flex items-center justify-center p-0 m-0`
const CalculatorButton2 = tw(CalculatorButton)`col-span-2`
const CalculatorButtons = tw.div`grid gap-4 grid-cols-4 grid-rows-4`

const EqualButtons = tw.div`mt-8 grid gap-2 grid-cols-2`
const SubtractButton = styled.button(() => {
  return [
    tw`ring-1 ring-black bg-red-700 text-white h-8 flex items-center justify-center p-2 rounded`,
    `> svg { height: 100%; }`
  ]
})
const AddButton = styled.button(() => {
  return [
    tw`ring-1 ring-black bg-green-700 text-white h-8 flex items-center justify-center p-2 rounded`,
    `> svg { height: 100%; }`
  ]
})

interface CalculatorProps {
  handleEnter: (calculatedValue: number) => void;
}

export const Calculator = ({ handleEnter }: CalculatorProps): JSX.Element => {
  const [equation, setEquation] = useState("")
  const [displayValue, setDisplayValue] = useState(0)
  const [calculatedValue, setCalculatedValue] = useState(0)
  const equationInput = useRef<HTMLInputElement>();

  const handleNumberClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const newValue = displayValue === 0 ? parseInt(e.currentTarget.value) : parseInt(displayValue + e.currentTarget.value)
    setEquation(equation + e.currentTarget.value)
    setDisplayValue(newValue)
  }

  const handleEquationChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEquation(e.currentTarget.value);
  }

  const handleOperatorClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const operator = e.currentTarget.value;
    setEquation(equation + operator)
    setDisplayValue(0)
  }

  const handleClearclick = () => {
    setDisplayValue(0)
  }

  useEffect(() => {
    setCalculatedValue(findResult(equation))
  }, [equation])

  useEffect(() => {
    if (equationInput.current) {
      equationInput.current.focus();
    }
  }, []);

  return (
    <CalculatorWrapper>
      <form onSubmit={() => handleEnter(calculatedValue)}>
      <CalculatorScreenWrapper>
        <CalculatorEquation ref={equationInput} type="text" onChange={handleEquationChange} value={equation} />
        <CalculatorScreen type="text" value={calculatedValue} readOnly />
      </CalculatorScreenWrapper>
      <CalculatorButtons>
        <CalculatorButton label="7" value="7" handleClick={handleNumberClick} />
        <CalculatorButton label="8" value="8" handleClick={handleNumberClick} />
        <CalculatorButton label="9" value="9" handleClick={handleNumberClick} />
        <CalculatorButton label="÷" value="/" handleClick={handleOperatorClick} />
        <CalculatorButton label="4" value="4" handleClick={handleNumberClick} />
        <CalculatorButton label="5" value="5" handleClick={handleNumberClick} />
        <CalculatorButton label="6" value="6" handleClick={handleNumberClick} />
        <CalculatorButton label="×" value="*" handleClick={handleOperatorClick} />
        <CalculatorButton label="1" value="1" handleClick={handleNumberClick} />
        <CalculatorButton label="2" value="2" handleClick={handleNumberClick} />
        <CalculatorButton label="3" value="3" handleClick={handleNumberClick} />
        <CalculatorButton label="-" value="-" handleClick={handleOperatorClick} />
        <CalculatorButton label="C" value="0" handleClick={handleClearclick} />
        <CalculatorButton label="0" value="0" handleClick={handleNumberClick} />
        <CalculatorButton label="." value="." handleClick={handleNumberClick} />
        <CalculatorButton label="+" value="+" handleClick={handleOperatorClick} />
      </CalculatorButtons>
      <EqualButtons>
        <SubtractButton type="button" onClick={() => handleEnter(calculatedValue*-1)}><MinusIcon /></SubtractButton>
        <AddButton type="submit" onClick={() => handleEnter(calculatedValue)}><PlusIcon /></AddButton>
      </EqualButtons>
      </form>
    </CalculatorWrapper>
  )
}
