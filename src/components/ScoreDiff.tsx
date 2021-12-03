import { useContext } from 'react'
import tw, {styled} from 'twin.macro'

import { GameContext } from '../context/GameContext'
import { PlayerData } from './Player'

interface ScoreBGProps {
  winningPlayer?: PlayerData;
  losingPlayer?: PlayerData;
}

// const ScoreContainer = styled.div`position: absolute;
// top: 50%;
// left: 50%;
// transform: translate3d(-50%, -50%, 0);
// width: 25px;
// height: 25px;
// display: flex;
// align-items: center;
// justify-content: center;
// z-index: 5;`
const ScoreContainer = tw.div`
absolute top-1/2 left-1/2 -transform -translate-x-1/2 -translate-y-1/2 
w-8 h-8 flex items-center justify-center z-10`

const ScoreBG = styled.div<ScoreBGProps>(({ winningPlayer, losingPlayer }: ScoreBGProps) => [
  `
  width: 100%; 
  height: 100%; 
  position: absolute; 
  top: 0; 
  left: 0; 
  transform: rotate(45deg); 
  background-color: ${losingPlayer?.bgcolor}; 
  z-index: 5;`
])
const ScoreText = styled.div<ScoreBGProps>(({ losingPlayer }: ScoreBGProps) => [
  `
  position: absolute; 
  top: 0; 
  left: 0; 
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${losingPlayer?.fgcolor};
`
])

const CalculateDiff = (playerData: PlayerData[]): number => {
  const playersSorted = [...playerData];
  playersSorted.sort((a,b) => b.score-a.score);
  return playersSorted[0].score - playersSorted[1].score;
}

const GetWinningPlayer = (playerData: PlayerData[]): PlayerData => {
  const playersSorted = [...playerData];
  playersSorted.sort((a,b) => b.score-a.score);
  return playersSorted[0];
}

const GetLosingPlayer = (playerData: PlayerData[]): PlayerData => {
  const playersSorted = [...playerData];
  playersSorted.sort((a,b) => b.score-a.score);
  return playersSorted[1];
}

const ScoreDiff = () => {
  const gameContext = useContext(GameContext);
  const playerData: PlayerData[] = gameContext.gameData.playerData;
  const scoreDiff: number = CalculateDiff(playerData);

  if (scoreDiff === 0) return null;

  return (<ScoreContainer>
    <ScoreBG winningPlayer={GetWinningPlayer(playerData)} losingPlayer={GetLosingPlayer(playerData)} />
    <ScoreText losingPlayer={GetLosingPlayer(playerData)}>{scoreDiff}</ScoreText>
    </ScoreContainer>)
}

export default ScoreDiff;
