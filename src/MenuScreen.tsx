import { FaArrowDown } from "react-icons/fa"
import { NumberSpinner } from "./NumberSpinner"
import { useContext } from "react"
import { AppContext } from "./App"

export interface MenuScreenProps {
    playClicked: () => void
}

export const MenuScreen = ({ playClicked }: MenuScreenProps): React.JSX.Element => {
    const { playerCount, updatePlayerCount } = useContext(AppContext)

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
            <h1 style={{ fontSize: '4rem', textAlign: 'center' }}>Darts Scoring</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }} >
                <label style={{ fontSize: '2rem' }}>Players</label>
                <NumberSpinner min={1} max={6} defaultNumber={playerCount} onChange={updatePlayerCount} />
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
        </div>
    )
}