import { useContext, useEffect, useRef, useState } from 'react'
import styles from './PlayScreen.module.css'
import { AppContext } from './App'
import { calculatePlayerAvg } from './Player'
import { Numpad } from './Numpad'
import { FaArrowUp, FaUndo } from 'react-icons/fa'
import { checkouts } from './Checkouts'

export interface PlayScreenProps {
    menuClicked: () => void
}

export const PlayScreen = ({ menuClicked }: PlayScreenProps): React.JSX.Element => {
    const { playerCount, players, updatePlayers } = useContext(AppContext)

    const [currentPlayer, setCurrentPlayer] = useState(0)

    const playerDisplayRefs = useRef<(HTMLElement | null)[]>([])

    const resetPlayers = () => {
        const updatedPlayers = players.map(player => ({
            ...player,
            score: 501,
            scoreHistory: []
        }))
        updatePlayers(updatedPlayers)
    }

    const resetGame = () => {
        resetPlayers()
        setCurrentPlayer(0)
    }

    useEffect(() => {
        resetGame()
    }, [])

    const changePlayer = (next: boolean) => {
        const updatedCurrentPlayer = (currentPlayer + (next ? 1 : -1)) % playerCount

        playerDisplayRefs.current[updatedCurrentPlayer]?.scrollIntoView({ behavior: 'smooth' })
        setCurrentPlayer(updatedCurrentPlayer)
    }

    const updatePlayerScore = (playerIdx: number, score: number) => {
        const updatedPlayers = [...players]
        updatedPlayers[playerIdx].score = updatedPlayers[playerIdx].score - score
        updatedPlayers[playerIdx].scoreHistory.push(score)

        updatePlayers(updatedPlayers)
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
                        <FaArrowUp size={'0.75rem'} />
                        <div style={{ fontSize: '0.75rem', lineHeight: 0.8 }}>Menu</div>
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
                        <div style={{ fontSize: '0.75rem', lineHeight: 0.8 }}>Reset</div>
                        <FaUndo size={'0.75rem'} />
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
                            {checkouts[player.score as keyof object] != null &&
                                <div className={styles.checkout}>{checkouts[player.score as keyof object]}</div>
                            }
                        </div>
                        <div className={styles.statsContainer}>
                            <div className={styles.statDisplay}>
                                <div className={styles.statTitle}>Last</div>
                                <div className={styles.statValue}>{player.scoreHistory.length > 0 ? player.scoreHistory.slice(-1) : '-'}</div>
                            </div>
                            <div className={styles.statDisplay}>
                                <div className={styles.statTitle}>Avg</div>
                                <div className={styles.statValue}>{calculatePlayerAvg(player.scoreHistory).toFixed(2)}</div>
                            </div>
                            <div className={styles.statDisplay}>
                                <div className={styles.statTitle}>Throws</div>
                                <div className={styles.statValue}>{player.scoreHistory.length}</div>
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