import { FaArrowDown } from "react-icons/fa"
import { NumberSpinner } from "./NumberSpinner"
import { useContext } from "react"
import { AppContext } from "./App"
import styles from './MenuScreen.module.css'

export interface MenuScreenProps {
    playClicked: () => void
}

export const MenuScreen = ({ playClicked }: MenuScreenProps): React.JSX.Element => {
    const { playerCount, updatePlayerCount, players, updatePlayers } = useContext(AppContext)

    const updatePlayerName = (playerIdx: number, name: string) => {
        const updatedPlayers = [...players]
        updatedPlayers[playerIdx].name = name
        updatePlayers(updatedPlayers)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '2rem',
                boxSizing: 'border-box',
                justifyContent: 'space-between'
            }}
        >
            <h1 style={{ fontSize: '4rem', textAlign: 'center', margin: '2rem' }}>Darts Scoring</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }} >
                    <label style={{ fontSize: '2rem' }}>Players</label>
                    <NumberSpinner min={1} max={6} defaultNumber={playerCount} onChange={updatePlayerCount} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {players.map((player, playerIdx) => <input className={styles.nameInput} value={player.name} onChange={(e) => updatePlayerName(playerIdx, e.target.value)} />)}
                </div>
            </div>
            <button
                onClick={playClicked}
                style={{
                    width: '100%',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    outline: 'none',
                    border: 0
                }}
            >
                <h2
                    style={{
                        fontSize: '3rem',
                        margin: 0
                    }}
                >
                    Play
                </h2>
                <FaArrowDown size={80} />
            </button>
        </div >
    )
}