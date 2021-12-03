import tw from "twin.macro"

import { PlayerCardHolder } from "./components/PlayerCardHolder"
import ScoreDiff from "./components/ScoreDiff"
import { Settings } from "./components/Settings"

import { GameProvider } from "./context/GameContext"

interface ScoreDiffProps {
  className?: string;
  readonly winningPlayer: number;
}

const AppContainer = tw.div`relative text-center bg-gray-900 text-white h-screen`

function App() {
  return (
    <AppContainer>
        <GameProvider>
          <div>
            <ScoreDiff />
            <PlayerCardHolder />
            <Settings />
          </div>
        </GameProvider>
    </AppContainer>
  )
}

export default App
