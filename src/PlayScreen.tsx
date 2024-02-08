import { useContext, useEffect, useRef, useState } from 'react'
import styles from './PlayScreen.module.css'
import { AppContext } from './App'
import { Player } from './Player'
import { Numpad } from './Numpad'

export interface PlayScreenProps {
    menuClicked: () => void
}

export const PlayScreen = ({ menuClicked }: PlayScreenProps): React.JSX.Element => {
    const { playerCount } = useContext(AppContext)

    const createNewPlayers = (count: number): Player[] => {
        const players: Player[] = []

        for (let i = 0; i < count; i++) {
            players.push({
                name: '**NAME**',
                score: 501
            })
        }

        return players
    }

    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [players, setPlayers] = useState<Player[]>(createNewPlayers(playerCount))
    const playerDisplayRefs = useRef<(HTMLElement | null)[]>([])

    useEffect(() => {
        setPlayers(createNewPlayers(playerCount))
    }, [playerCount])

    const changePlayer = (next: boolean) => {
        const updatedCurrentPlayer = (currentPlayer + (next ? 1 : -1)) % playerCount

        playerDisplayRefs.current[updatedCurrentPlayer]?.scrollIntoView({
            behavior: 'smooth',
        })
        setCurrentPlayer(updatedCurrentPlayer)
    }

    const updatePlayerScore = (playerIdx: number, score: number) => {
        const updatedPlayers = [...players]
        updatedPlayers[playerIdx].score = updatedPlayers[playerIdx].score - score
        setPlayers(updatedPlayers)
    }

    return (
        <div
            className={styles.container}
        >
            <div>
                Playing Screen
                <button onClick={menuClicked}>Menu</button>
            </div>
            <div className={styles.playerCarousel}>
                {players.map((player, playerIdx) => (
                    <div className={styles.playerContainer} ref={(element) => playerDisplayRefs.current[playerIdx] = element}>
                        Player{playerIdx} {player.name} - Score {player.score}
                        <div className={styles.playerMain}>

                        </div>
                        <div className={styles.numpadContainer}>
                            <Numpad maxVal={180} cofirmPressed={(score) => { updatePlayerScore(playerIdx, score); changePlayer(true) }} />
                        </div>
                        {/* <div className={styles.lowerButtonsContainer}>
                            <button onClick={() => changePlayer(false)}>Prev Player</button>
                            <button onClick={() => changePlayer(true)}>Next Player</button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}