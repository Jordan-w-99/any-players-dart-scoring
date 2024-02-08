import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import { PlayScreen } from './PlayScreen'
import { MenuScreen } from './MenuScreen'
import { FullscreenSection } from './FullscreenSection'

export const DEFAULT_PLAYER_COUNT = 2

export interface IAppContext {
  playerCount: number
  updatePlayerCount: (count: number) => void
}

export const AppContext = createContext<IAppContext>({
  playerCount: DEFAULT_PLAYER_COUNT,
  updatePlayerCount: () => { }
})

const App = () => {
  const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT)

  const updatePlayerCount = (count: number) => {
    setPlayerCount(count)
  }

  const menuSectionRef = useRef<HTMLElement>(null)
  const playSectionRef = useRef<HTMLElement>(null)

  const scrollIntoViewOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
  }

  const toPlayScreen = () => {
    playSectionRef.current?.scrollIntoView(scrollIntoViewOptions)
  }

  const toMenuScreen = () => {
    menuSectionRef.current?.scrollIntoView(scrollIntoViewOptions)
  }

  useEffect(() => {
    toPlayScreen()
  }, [])

  return (
    <AppContext.Provider value={{ playerCount, updatePlayerCount }}>
      <div
        style={{
          overflow: 'hidden',
          height: '100dvh',
          maxHeight: '100vh',
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
