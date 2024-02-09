import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './PlayScreen.module.css'
import { AppContext } from './App'
import { Player } from './Player'
import { Numpad } from './Numpad'
import { FaArrowUp, FaUndo } from 'react-icons/fa'

export interface PlayScreenProps {
    menuClicked: () => void
}

export const PlayScreen = ({ menuClicked }: PlayScreenProps): React.JSX.Element => {
    const { playerCount } = useContext(AppContext)

    const createNewPlayers = (count: number): Player[] => {
        const players: Player[] = []

        for (let i = 0; i < count; i++) {
            players.push({
                name: `Player ${i + 1}`,
                score: 501
            })
        }

        return players
    }

    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [players, setPlayers] = useState<Player[]>(createNewPlayers(playerCount))
    const playerDisplayRefs = useRef<(HTMLElement | null)[]>([])

    const resetGame = useCallback(() => {
        setPlayers(createNewPlayers(playerCount))
        setCurrentPlayer(0)
    }, [setPlayers, setCurrentPlayer, playerCount])

    useEffect(() => {
        resetGame()
    }, [resetGame])

    const changePlayer = (next: boolean) => {
        const updatedCurrentPlayer = (currentPlayer + (next ? 1 : -1)) % playerCount

        playerDisplayRefs.current[updatedCurrentPlayer]?.scrollIntoView({ behavior: 'smooth' })
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
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div>
                    <button
                        onClick={menuClicked}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            outline: 'none',
                            border: 0,
                            gap: 10
                        }}
                    >
                        <FaArrowUp size={'1rem'} />
                        <div style={{ fontSize: '1rem', lineHeight: 0.8 }}>Menu</div>
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            playerDisplayRefs.current[0]?.scrollIntoView({ behavior: 'smooth' })
                            resetGame()
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            outline: 'none',
                            border: 0,
                            gap: 10
                        }}
                    >
                        <div style={{ fontSize: '1rem', lineHeight: 0.8 }}>Reset</div>
                        <FaUndo size={'1rem'} />
                    </button>
                </div>
            </div>
            <div className={styles.allPlayersOverview}>
                {players.map((player, playerIdx) => (
                    <div className={`${styles.playerOverview} ${playerIdx === currentPlayer ? styles.currentPlayerOverview : null}`}>
                        <b>{player.name}</b>
                        <div>{player.score}</div>
                    </div>
                ))}
            </div>
            <div className={styles.playerCarousel}>
                {players.map((player, playerIdx) => (
                    <div className={styles.playerContainer} ref={(element) => playerDisplayRefs.current[playerIdx] = element}>
                        <div className={styles.playerMainInfo}>
                            <div className={styles.playerName}>{player.name}</div>
                            <div className={styles.playerScore}>{player.score}</div>
                        </div>
                        <div className={styles.statsContainer}>
                            <div className={styles.statDisplay}>
                                <div className={styles.statTitle}>Last</div>
                                <div className={styles.statValue}>180</div>
                            </div>
                            <div className={styles.statDisplay}>
                                <div className={styles.statTitle}>Avg</div>
                                <div className={styles.statValue}>180</div>
                            </div>
                            <div className={styles.statDisplay}>
                                <div className={styles.statTitle}>Throws</div>
                                <div className={styles.statValue}>180</div>
                            </div>
                        </div>
                        <div className={styles.numpadContainer}>
                            <Numpad maxVal={180} cofirmPressed={(score) => { updatePlayerScore(playerIdx, score); changePlayer(true) }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}