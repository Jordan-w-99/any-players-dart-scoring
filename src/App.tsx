import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import './App.css'
import { PlayScreen } from './PlayScreen'
import { MenuScreen } from './MenuScreen'
import { FullscreenSection } from './FullscreenSection'
import { Player } from './Player'

export const DEFAULT_PLAYER_COUNT = 2

export interface IAppContext {
  playerCount: number
  updatePlayerCount: (count: number) => void
  players: Player[]
  updatePlayers: (players: Player[]) => void
}

export const AppContext = createContext<IAppContext>({
  playerCount: DEFAULT_PLAYER_COUNT,
  updatePlayerCount: () => { },
  players: [],
  updatePlayers: () => { }
})

const App = () => {
  const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT)

  const updatePlayerCount = (count: number) => {
    if (count < playerCount) {
      removeLastPlayer()
    }

    if (count > playerCount) {
      addEmptyPlayer()
    }

    setPlayerCount(count)
  }

  const getNewPlayer = (num: number) => ({
    name: `Player ${num}`,
    score: 501,
    scoreHistory: []
  })

  const createNewPlayers = (count: number): Player[] => {
    const players: Player[] = []

    for (let i = 0; i < count; i++) {
      players.push(getNewPlayer(i + 1))
    }

    return players
  }

  const [players, setPlayers] = useState<Player[]>(createNewPlayers(playerCount))

  const addEmptyPlayer = () => {
    setPlayers([...players, getNewPlayer(players.length + 1)])
  }

  const removeLastPlayer = () => {
    const updatedPlayers = [...players]
    updatedPlayers.pop()
    setPlayers(updatedPlayers)
  }

  const updatePlayers = (players: Player[]) => {
    setPlayers(players)
  }

  const menuSectionRef = useRef<HTMLElement>(null)
  const playSectionRef = useRef<HTMLElement>(null)

  const scrollIntoViewOptions: ScrollIntoViewOptions = useMemo(() => ({
    behavior: 'smooth',
  }), []);

  const toPlayScreen = useCallback(() => {
    playSectionRef.current?.scrollIntoView(scrollIntoViewOptions)
  }, [scrollIntoViewOptions])

  const toMenuScreen = () => {
    menuSectionRef.current?.scrollIntoView(scrollIntoViewOptions)
  }

  // useEffect(() => {
  //   toPlayScreen()
  // }, [toPlayScreen])

  return (
    <AppContext.Provider value={{
      playerCount,
      updatePlayerCount,
      players,
      updatePlayers
    }}>
      <div
        style={{
          overflow: 'hidden',
          height: '100dvh',
          maxHeight: '100dvh',
          maxWidth: 480,
          margin: 'auto'
        }}
      >
        <FullscreenSection
          sectionRef={menuSectionRef}
          element={
            <MenuScreen playClicked={toPlayScreen} />
          }
        />
        <FullscreenSection
          sectionRef={playSectionRef}
          element={
            <PlayScreen menuClicked={toMenuScreen} />
          }
        />
      </div>
    </AppContext.Provider>
  )
}

export default App
