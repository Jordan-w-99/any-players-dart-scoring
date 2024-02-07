export interface PlayScreenProps {
    menuClicked: () => void
}

export const PlayScreen = ({ menuClicked }: PlayScreenProps): React.JSX.Element => {
    return (
        <div>
            Playing Screen
            <button onClick={menuClicked}>Menu</button>
        </div>
    )
}